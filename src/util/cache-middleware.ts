// Adding Cache Middleware to Express
import { RequestHandler } from 'express';
import { redisClient } from '../configs/cache.config';

export const cache = (duration: number): RequestHandler  => {
  return async (req, res, next) => {
    const key = `__express__${req.method}__${req.originalUrl}`;

    const cachedBody = await redisClient.get(key); // O(1)

    if (cachedBody) {
      res.send(JSON.parse(cachedBody));
      return;
    } else {
      const sendResponse = res.send;
      res.send = (body) => {
        redisClient.setEx(key, duration * 1000, JSON.stringify(body)); // O(1)
        sendResponse(body);
        return res;
      };
      next();
    }
  }
};

// what type of caching would you call this?
// A. Read-through caching
// B. Write-through caching
// C. Write-behind caching
// D. Refresh-ahead caching
// E. Cache-aside caching

// what layer are we caching in this code snippet?
// A. Client-side caching
// B. Server-side caching
// C. Database caching




// Answer: E. Cache-aside caching
// Answer: B. Server-side caching
