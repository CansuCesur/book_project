const redis = require('redis');
const logger = require('./logger')

const redisClient = redis.createClient({
    url: 'redis://redis-container:6379',
});

redisClient.on('connect', () => {
    logger.info('Connected to Redis');
});

module.exports = { redisClient };