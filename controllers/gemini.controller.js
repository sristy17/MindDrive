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
              text: `Today I'm in ${mood} mood, Generate 5 tasks that I can do according to my mood to improve them.`
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

export { trackMood, getTasks };