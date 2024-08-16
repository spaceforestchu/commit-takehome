import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { getRestaurantById } from "../../models/restaurant.model";
const validator = createValidator();

interface FindRestaurantByIdSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string
    }
}

const expectedParams = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const main: RequestHandler = async (req: ValidatedRequest<FindRestaurantByIdSchema>, res, next) => {
    try {
        const { id: restaurantId } = req.params;

        // use id to find restaurant
        const restaurant = await getRestaurantById(restaurantId);

        if (restaurant) {
            res.status(200).send(restaurant);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err)
    }
}

export const getRestaurantByIdController = Router({ mergeParams: true }).use(validator.params(expectedParams), main);