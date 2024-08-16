import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { deleteRestaurant } from "../../models/restaurant.model";
const validator = createValidator();

interface DeleteRestaurantSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string
    }
}

const expectedParams = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

const main: RequestHandler = async (req: ValidatedRequest<DeleteRestaurantSchema>, res, next) => {
    try {
        const { id: restaurantId } = req.params;

        // use id to find restaurant and delete it
        const deletedId = await deleteRestaurant(restaurantId);

        if (deletedId) {
            res.status(200).send({
                success: 1,
                removedId: deletedId
            });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err)
    }
}

export const deleteRestaurantController = Router({ mergeParams: true }).use(validator.params(expectedParams), main);