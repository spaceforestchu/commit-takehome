import e, { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { makeReservation } from "../../models/reservation.model";
import { Reservation } from "../../util/types";
const validator = createValidator();

interface MakeReservationSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Omit<Reservation, 'id'>
}

const expectedBody = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    time: Joi.date().required(),
    numGuests: Joi.number().required(),
    restaurantId: Joi.string().guid({ version: 'uuidv4' }).required(),
})

const main: RequestHandler = async (req: ValidatedRequest<MakeReservationSchema>, res, next) => {
    try {
        const newReservation = await makeReservation(req.body);

        if (newReservation) {
            res.status(201).send(newReservation);
        }
    } catch (err) {
        next(err)
    }

}

export const makeReservationController = Router().use(validator.body(expectedBody), main);