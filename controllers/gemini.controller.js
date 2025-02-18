import axios from 'axios';
import { GEMINI_API_ENDPOINT, GEMINI_API_KEY } from '../config/keys.conf.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getBotPrompt } from '../utils/bot.js';
import redisClient from '../config/redis.config.js';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function getMood(moodValue) {
  switch (moodValue) {
    case 0:
      return "Very Sad";
    case 1:
      return "Sad";
    case 2:
      return "Neutral";
    case 3:
      return "Happy";
    case 4:
      return "Very Happy";
    case 5:
      return "Extremely Happy";
    default:
      return "Invalid Mood Value";
  }
}

const trackMood = async (req, res) => { 
  try {
    const { scale } = req.body;

    if (!scale) {
      return res.status(400).json({ error: 'Scale value is required' });
    }

    const mood = getMood(scale);
    const cacheKey = `mood_${scale}`;

    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) {
        console.error('Redis GET error:', err);
      }
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      } else {
        const requestData = {
          contents: [
            {
              parts: [
                {
                  text: `Today I'm in ${mood} mood, tell me something to cheer me up in 3-4 lines!`
                }
              ]
            }
          ]
        };

        const response = await axios.post(
          `${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        redisClient.setex(cacheKey, 3600, JSON.stringify(response.data.candidates[0].content.parts[0].text));
        res.json(response.data.candidates[0].content.parts[0].text);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the diagnosis' });
  }
};

const getTasks = async (req, res) => {
  try {
    const { scale } = req.body;

    if (!scale) {
      return res.status(400).json({ error: 'Scale value is required' });
    }

    const mood = getMood(scale);
    const cacheKey = `tasks_${scale}`;

    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) {
        console.error('Redis GET error:', err);
      }
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      } else {
        const requestData = {
          contents: [
            {
              parts: [
                {
                  text: `Today I'm in ${mood} mood, Generate 3 tasks that I can do according to my mood to improve them. Just 1 line each task. Give them in HTML paragraph tags so that I can directly render them on the webpage. No need to write entire HTML, only 3 <p> tags with content.`
                }
              ]
            }
          ]
        };

        const response = await axios.post(
          `${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        redisClient.setex(cacheKey, 3600, JSON.stringify(response.data.candidates[0].content.parts[0].text));
        res.json(response.data.candidates[0].content.parts[0].text);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the diagnosis' });
  }
};

const botresponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message value is required' });
    }

    if (!req.session.messages) {
      req.session.messages = [];
      req.session.sentGreeting = false; 
    }

    if (!req.session.sentGreeting) {
      req.session.messages.push({ text: "Hello! I'm MindGuide, your dedicated mental health companion. Feel free to share your thoughts, and I'll be here to support you." });
      req.session.sentGreeting = true; 
    }

    req.session.messages.push({ text: message, timestamp: new Date() });

    let historyText = req.session.messages.map(msg => msg.text).join('\n');
    console.log(historyText);

    const prompt = getBotPrompt(message, historyText);

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `${prompt}\n\nConversation history:\n${historyText}`
            }
          ]
        }
      ]
    };

    const response = await axios.post(
      `${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the response' });
  }
};

export { trackMood, getTasks, botresponse };
