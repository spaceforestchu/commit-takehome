import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation";
import { Reservation } from "../../util/types";
import { updateReservationById } from "../../models/reservation.model";
const validator = createValidator();

interface UpdateReservationSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Partial<Omit<Reservation, 'id' | 'restaurantId'>>,
    [ContainerTypes.Params]: {
        id: string
    }
}

const expectedBody = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
    email: Joi.string().email({ tlds: { allow: false } }),
    time: Joi.date(),
    numGuests: Joi.number(),
});

const expectedParams = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
})

const main: RequestHandler = async (req: ValidatedRequest<UpdateReservationSchema>, res, next) => {
    try {
        const { id: reservationId } = req.params;


        // use id to find reservation
        const reservation = await updateReservationById(reservationId, req.body);

        if (reservation) {
            res.status(200).send(reservation);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err)
    }
}

export const updateReservationController = Router({ mergeParams: true }).use(
    validator.params(expectedParams), 
    validator.body(expectedBody), 
    main
);
