import { Router } from "express"
import { getReservationsByRestaurantIdController } from "../controllers/restaurants/getReservationsByRestaurantId.controller";
import { addRestaurantController } from "../controllers/restaurants/addRestaurant.controller";
import { getRestaurantByIdController } from "../controllers/restaurants/getRestaurantById.controller";
import { getRestaurantsController } from "../controllers/restaurants/getRestaurants.controller";
import { deleteRestaurantController } from "../controllers/restaurants/deleteRestaurant.controller";
import { updateRestaurantController } from "../controllers/restaurants/updateRestaurant.controller";

const getRestaurantsRoute = Router().get('/', getRestaurantsController);
const getRestaurantByIdRoute = Router().get('/:id', getRestaurantByIdController);
const getReservationsByRestaurantIdRoute = Router().get('/:id/reservations', getReservationsByRestaurantIdController);
const updateRestaurantRoute = Router().patch('/:id', updateRestaurantController);
const addRestaurantRoute = Router().post('/', addRestaurantController);
const deleteRestaurantRoute = Router().delete('/:id', deleteRestaurantController);

export const restaurantRouter = Router().use('/restaurants', [
    getRestaurantsRoute,
    getRestaurantByIdRoute,
    addRestaurantRoute,
    getReservationsByRestaurantIdRoute,
    deleteRestaurantRoute,
    updateRestaurantRoute
]);