import { Router } from 'express';
import { reservationRouter } from './reservations';
import { restaurantRouter } from './restaurants';

export const appRouter = Router().use(
    reservationRouter,
    restaurantRouter,
)