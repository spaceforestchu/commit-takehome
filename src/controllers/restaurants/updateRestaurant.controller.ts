import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation";
import { Restaurant } from "../../util/types";
import { updateRestaurantById } from "../../models/restaurant.model";
const validator = createValidator();

interface UpdateRestaurantSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Partial<Omit<Restaurant, 'id'>>,
    [ContainerTypes.Params]: {
        id: string
    }
}

const expectedBody = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).allow(null, ''),
    openingTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/),
    closingTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/),
    location: Joi.string(),
    diningRestriction: Joi.string().valid('Delivery Only', 'Takeout Only').allow(null, ''),
    price: Joi.string().valid('$', '$$', '$$$', '$$$$'),
    cuisine: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
    tables: Joi.object({
        twoPersonTables: Joi.number().required(),
        fourPersonTables: Joi.number().required(),
        eightPersonTables: Joi.number().required(),
    }).allow(null)
});

const expectedParams = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
})

const main: RequestHandler = async (req: ValidatedRequest<UpdateRestaurantSchema>, res, next) => {
    try {
        const { id: restaurantId } = req.params;

        // use id to update restaurant
        const restaurant = await updateRestaurantById(restaurantId, req.body);

        if (restaurant) {
            res.status(200).send(restaurant);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err)
    }
}

export const updateRestaurantController = Router({ mergeParams: true }).use(
    validator.params(expectedParams), 
    validator.body(expectedBody), 
    main
);
