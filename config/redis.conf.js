// config/redis.config.js
const redis = require('redis');

const client = redis.createClient({
  host: 'localhost', // Replace with your Redis server address
  port: 6379,        // Default Redis port
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;
