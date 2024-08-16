import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { Restaurant } from "../../util/types";
import { addRestaurant } from "../../models/restaurant.model";
const validator = createValidator();

export interface AddRestaurantSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Omit<Restaurant, 'id'>
}

// TODO: define a query object (pagination?, filters?)
const expectedBody = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    phoneNumber: Joi.string().pattern(/^\+[1-9]{1}[0-9]{3,14}$/).allow(null, ''),
    openingTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/).required(),
    closingTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/).required(),
    location: Joi.string().required(),
    diningRestriction: Joi.string().valid('Delivery Only', 'Takeout Only').allow(null, ''),
    price: Joi.string().valid('$', '$$', '$$$', '$$$$'),
    cuisine: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
    tables: Joi.object({
        twoPersonTables: Joi.number().required(),
        fourPersonTables: Joi.number().required(),
        eightPersonTables: Joi.number().required(),
    }).allow(null)
});

const main: RequestHandler = async (req: ValidatedRequest<AddRestaurantSchema>, res, next) => {
    try {
        const newRestaurant = await addRestaurant(req.body);

        if (newRestaurant) {
            res.status(201).send(newRestaurant);
        }
    } catch (err) {
        next(err)
    }
}

export const addRestaurantController = Router().use(validator.body(expectedBody), main);