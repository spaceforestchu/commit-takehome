import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { getRestaurants } from "../../models/restaurant.model";
import { RestaurantSearchFilters } from "../../util/types";
const validator = createValidator();

interface FindRestaurantsSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        filters: RestaurantSearchFilters,
        searchTerm: string
    }
}

const allowedPrices = Joi.string().valid('$', '$$', '$$$', '$$$$');

const expectedQuery = Joi.object({
    filters: Joi.object({
        diningRestriction: Joi.string().valid('Delivery Only', 'Takeout Only'),
        price: Joi.alternatives().try(Joi.array().items(allowedPrices), allowedPrices),
        cuisine: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
        location: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
    }),
    searchTerm: Joi.string().allow(null),
})

const main: RequestHandler = async (req: ValidatedRequest<FindRestaurantsSchema>, res, next) => {
    try {
        const restaurants = await getRestaurants(req.query);

        if (restaurants) {
            res.status(200).send({ restaurants })
        }
    } catch (err) {
        next(err)
    }
}

export const getRestaurantsController = Router().use(validator.query(expectedQuery), main);