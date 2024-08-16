import { Router } from "express"
import { getReservationByIdController } from "../controllers/reservations/getReservationById.controller";
import { deleteReservationController } from "../controllers/reservations/deleteReservation.controller";
import { getReservationsController } from "../controllers/reservations/getReservations.controller";
import { makeReservationController } from "../controllers/reservations/makeReservation.controller";
import { updateReservationController } from "../controllers/reservations/updateReservation.controller";

const getReservationsRoute = Router().get('/', getReservationsController);
const getReservationByIdRoute = Router().get('/:id', getReservationByIdController);
const makeReservationRoute = Router().post('/', makeReservationController);
const updateReservationRoute = Router().patch('/:id', updateReservationController)
const deleteReservationRoute = Router().delete('/:id', deleteReservationController);

export const reservationRouter = Router().use('/reservations', [
    getReservationsRoute,
    getReservationByIdRoute,
    makeReservationRoute,
    updateReservationRoute,
    deleteReservationRoute
]);