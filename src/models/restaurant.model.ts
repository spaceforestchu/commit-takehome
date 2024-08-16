// Contains all direct interactions with the Restaurant Model
import { pgKnex } from "../configs/db.config";
import { Restaurant, RestaurantSearchFilters } from "../util/types"

export const addRestaurant = async (input: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
    try {
        // Write Ahead Caching
        // TASK 1: Implement writing to the cache any new restaurants that get added to the backend
        // Note: We don't expect restaurant meta data to change very often but people may be reading this data often
        // Question: What type of eviction policy do we think would be best in this situation

        
        const [newRestaurant] = await pgKnex<Restaurant>('Restaurants').insert({ ...input, diningRestriction: (input.diningRestriction as any) === '' ? null : input.diningRestriction }).returning('*');

        return newRestaurant;
    } catch (err) {
        console.error(err);
        throw new Error(`Add Restaurant Failed -- ${err.message}`)
    }
}

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
    try {
        const restaurant: Restaurant = await pgKnex<Restaurant>('Restaurants')
            .leftJoin('Reservations', 'Reservations.restaurantId', 'Restaurants.id')
            .first('Restaurants.*', pgKnex.raw('JSON_AGG("Reservations".*) as reservations'))
            .where({ 'Restaurants.id': id })
            .groupBy('Restaurants.id', 'Reservations.restaurantId');

        return restaurant || null;
    } catch (err) {
        console.error(err);
        throw new Error(`Get Restaurant By ID -- ${err.message}`)
    }
}

export const getRestaurants = async ({ filters, searchTerm }: {
    filters?: RestaurantSearchFilters,
    searchTerm?: string
}): Promise<Restaurant[]> => {
    try {
        return await pgKnex<Restaurant>('Restaurants')
            .leftJoin('Reservations', 'Reservations.restaurantId', 'Restaurants.id')
            .select('Restaurants.*', pgKnex.raw('JSON_AGG("Reservations".*) as reservations'))
            .where((builder) => {
                // searchTerm filter
                if (searchTerm) {
                    builder.whereILike('name', `%${searchTerm}%`).orWhereILike('description', `%${searchTerm}%`)
                }
                
                // adding filters to whereBuilder
                if (filters) {
                    Object.entries(filters).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            builder.andWhere(key, 'in', value)
                        } else {
                            builder.andWhere(key, value)
                        }
                    })
                }

                return builder;
            })
            .groupBy('Restaurants.id', 'Reservations.restaurantId');
    } catch (err) {
        console.error(err);
        throw new Error(`Get Restaurants -- ${err.message}`)
    }
}

// returns id of the deleted Restaurant
export const deleteRestaurant = async (id: string): Promise<string> => {
    try {
        const rowsDeleted = await pgKnex('Restaurants')
            .where({ id })
            .del();

        if (rowsDeleted) {
            return id;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        throw new Error(`Delete Restaurant failed -- ${err.message}`);
    }
}

export const updateRestaurantById = async (id: string, update: Partial<Omit<Restaurant, 'id'>>) => {
    try {
        return await pgKnex<Restaurant>('Restaurants')
            .where({ id })
            .update({
                ...update,
                diningRestriction: (update.diningRestriction as any) === '' ? null : update.diningRestriction
            })
            .returning('*');
    } catch (err) {
        console.error(err);
        throw new Error(`Update Restaurant Failed -- ${err.message}`);
    }
}