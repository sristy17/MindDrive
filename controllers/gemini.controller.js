import axios from 'axios';
import { GEMINI_API_ENDPOINT, GEMINI_API_KEY } from '../config/keys.conf.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

    const mood = getMood(scale)

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

    const response = await axios.post(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data.candidates[0].content.parts[0].text);
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

    const mood = getMood(scale)

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `Today I'm in ${mood} mood, Generate 3 tasks that I can do according to my mood to improve them. Just 1 line each tasks. Give them in HTML paragram tags so that i can directly render them in webpage. No need to write entire html only 3 <p> tags with content.`
            }
          ]
        }
      ]
    };

    const response = await axios.post(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the diagnosis' });
  }
}

const botresponse = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message)
    if (!message) {
      return res.status(400).json({ error: 'Message value is required' });
    }

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `Restrict responses to mental health related questions only. For any other query, respond with "Please ask me a mental health related question, I am sworn to serve MindDrive.". Here is my question : ${message}`
            }
          ]
        }
      ]
    };

    const response = await axios.post(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the diagnosis' });
  }
}

export { trackMood, getTasks, botresponse };