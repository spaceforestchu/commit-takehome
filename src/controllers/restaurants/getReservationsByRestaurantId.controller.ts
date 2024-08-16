import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { getReservationsByRestaurantId } from "../../models/reservation.model";
const validator = createValidator();

interface FindReservationsByRestaurantIdSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string
    }
}

const expectedParams = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const main: RequestHandler = async (req: ValidatedRequest<FindReservationsByRestaurantIdSchema>, res, next) => {
    try {
        const { id: restaurantId } = req.params;

        // use id to find restaurant
        const reservations = await getReservationsByRestaurantId(restaurantId);

        if (reservations) {
            res.status(200).send(reservations);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err)
    }
}

export const getReservationsByRestaurantIdController = Router({ mergeParams: true }).use(validator.params(expectedParams), main);