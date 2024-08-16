import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { getReservations } from "../../models/reservation.model";
const validator = createValidator();

interface FindReservationsSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
    }
}

// TODO: define a query object (pagination?, filters?)
const expectedQuery = Joi.object({
})

const main: RequestHandler = async (req: ValidatedRequest<FindReservationsSchema>, res, next) => {
    try {
        const reservations = await getReservations(req.query);

        res.status(200).send({ reservations })
    } catch (err) {
        next(err)
    }
}

export const getReservationsController = Router().use(validator.query(expectedQuery), main);