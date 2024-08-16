// Contains all direct interactions with the Reservation Model

import { pgKnex } from "../configs/db.config";
import { Reservation } from "../util/types";

// returns the newly created Reservation
export const makeReservation = async (input: Omit<Reservation, 'id'>): Promise<Reservation> => {
    try {
        const [newReservation] = await pgKnex<Reservation>('Reservations').insert(input, '*');

        return newReservation;
    } catch (err) {
        console.error(err);
        throw new Error(`Make Reservation failed -- ${err.message}`);
    }
}

// returns Reservation associated with id
export const getReservationById = async (id: string): Promise<Reservation> => {
    try {
        return await pgKnex<Reservation>('Reservations').first('*').where({ id });
    } catch (err) {
        console.error(err);
        throw new Error(`Get Reservation By Id failed -- ${err.message}`)
    }
}

// returns list of Reservations based on query input
export const getReservations = async (input: any): Promise<Reservation[]> => {
    try {
        // currently get All Reservations
        // TODO: add filters
        return await pgKnex<Reservation>('Reservations').select('*');
    } catch (err) {
        console.error(err);
        throw new Error(`Get Reservations failed -- ${err.message}`);
    }
}

export const getReservationsByRestaurantId = async (restaurantId: string): Promise<Reservation[]> => {
    try {
        return await pgKnex<Reservation>('Reservations').select('*').where({ restaurantId });
    } catch (err) {
        console.error(err);
        throw new Error(`Get Reservations by Restaurant Id (${restaurantId}) failed -- ${err.message}`)
    }
}

// returns id of the deleted Reservation
export const deleteReservation = async (id: string): Promise<string> => {
    try {
        const rowsDeleted = await pgKnex('Reservations')
            .where({ id })
            .del();

        if (rowsDeleted) {
            return id;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        throw new Error(`Delete Reservation failed -- ${err.message}`);
    }
}

export const updateReservationById = async (id: string, update: Partial<Omit<Reservation, 'id' | 'restaurantId'>>) => {
    try {
        return await pgKnex<Reservation>('Reservations')
            .where({ id })
            .update({
                ...update
            })
            .returning('*');
    } catch (err) {
        console.error(err);
        throw new Error(`Update Reservation Failed -- ${err.message}`);
    }
}