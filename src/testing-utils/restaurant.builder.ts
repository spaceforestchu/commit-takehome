import { Reservation, Restaurant, TableConfig } from '../util/types';
import { v4 as uuidv4 } from 'uuid';
import { getRandomCuisine, getRandomPhoneNumber, loremHelper } from './helpers';
import { ReservationBuilder } from './reservation.builder';

export class RestaurantBuilder {
    private restaurant: Partial<Restaurant>;

    constructor() {
        this.restaurant = {
            id: uuidv4(),
        }
    }

    withName(name: string): RestaurantBuilder {
        this.restaurant.name = name;
        return this;
    }

    withDescription(description: string): RestaurantBuilder {
        this.restaurant.description = description;
        return this;
    }

    withPhoneNumber(phoneNumber: string): RestaurantBuilder {
        this.restaurant.phoneNumber = phoneNumber;
        return this;
    }

    withHours(openingTime: string, closingTime: string): RestaurantBuilder {
        this.restaurant.openingTime = openingTime;
        this.restaurant.closingTime = closingTime;
        return this;
    }

    withPrice(price: '$' | '$$' | '$$$' | '$$$$'): RestaurantBuilder {
        this.restaurant.price = price;
        return this;
    }

    withCuisine(cuisine: string): RestaurantBuilder {
        this.restaurant.cuisine = cuisine;
        return this;
    }

    withLocation(location: string): RestaurantBuilder {
        this.restaurant.location = location;
        return this;
    }

    withDiningRestriction(diningRestriction: 'Takeout Only' | 'Delivery Only'): RestaurantBuilder {
        this.restaurant.diningRestriction = diningRestriction;
        return this;
    }

    withTables(tables: TableConfig): RestaurantBuilder {
        this.restaurant.tables = tables;
        return this;
    }

    addReservations(numReservations: number): RestaurantBuilder {
        // TODO: implement
        this.restaurant.reservations = [
            ...Array(numReservations).map(() => new ReservationBuilder(this.restaurant.id).build())
        ]
        return this;
    }

    build(): Restaurant {
        return {
            id: this.restaurant.id,
            name: this.restaurant.name || loremHelper.generateWords(2),
            description: this.restaurant.description || loremHelper.generateSentences(3),
            phoneNumber: this.restaurant.phoneNumber || getRandomPhoneNumber(),
            openingTime: this.restaurant.openingTime || '10:00:00',
            closingTime: this.restaurant.closingTime || '22:00:00',
            price: this.restaurant.price || '$$',
            cuisine: this.restaurant.cuisine || getRandomCuisine(),
            location: this.restaurant.location,
            diningRestriction: this.restaurant.diningRestriction,
            tables: this.restaurant.tables,
            reservations: this.restaurant.reservations || [],
        }
    }
}