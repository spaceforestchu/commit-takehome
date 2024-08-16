import { RequestHandler, Router } from "express"
import Joi from "joi"
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation"
import { deleteReservation } from "../../models/reservation.model";
const validator = createValidator();

interface DeleteReservationSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string
    }
}

const expectedParams = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
})

const main: RequestHandler = async (req: ValidatedRequest<DeleteReservationSchema>, res, next) => {
    try {
        const { id: reservationId } = req.params;

        // use id to delete 
        const deletedId = await deleteReservation(reservationId);
    
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

export const deleteReservationController = Router({ mergeParams: true }).use(validator.params(expectedParams), main);