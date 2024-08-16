import { Router } from "express"
import { deleteReservationController, getReservationByIdController, getReservationsController, makeReservationController, updateReservationController } from "./controllers/reservations";
import { addRestaurantController, deleteRestaurantController, getRestaurantByIdController, getRestaurantsController, getReservationsByRestaurantIdController, updateRestaurantController } from "./controllers/restaurants";
import { cache } from "./util/cache-middleware";

const reservationRouter = Router().use('/reservations', [
    Router().get('/', cache(10), getReservationsController),
    Router().get('/:id', cache(360000), getReservationByIdController),
    Router().post('/', makeReservationController),
    Router().patch('/:id', updateReservationController),
    Router().delete('/:id', deleteReservationController)
]);

export const restaurantRouter = Router().use('/restaurants',
    Router().get('/', getRestaurantsController),
    Router().get('/:id', getRestaurantByIdController),
    Router().get('/:id/reservations', getReservationsByRestaurantIdController),
    Router().patch('/:id', updateRestaurantController),
    Router().post('/', addRestaurantController),
    Router().delete('/:id', deleteRestaurantController)
);

export const appRouter = Router().use(
    reservationRouter,
    restaurantRouter,
)