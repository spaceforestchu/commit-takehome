import { createClient } from 'redis';

export const redisClient = process.env.REDIS_URL
    ? createClient({
        url: process.env.REDIS_URL
    })
    : createClient({
        url: 'redis://cache:6379'
    });
redisClient.on('error', (err) => console.log('Redis Client Error: ', err));


