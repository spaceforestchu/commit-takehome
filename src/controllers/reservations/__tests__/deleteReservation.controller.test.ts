import { Restaurant } from "../../../util/types";
import request from "supertest";
import { app } from '../../../server';
import * as reservationModel from '../../../models/reservation.model';
import * as db_config from '../../../configs/db.config';
import knex from 'knex';
import { test_knex } from "../../../testing-utils/test-db.config";
import { v4 as uuidv4 } from 'uuid';
import { RestaurantBuilder } from "../../../testing-utils/restaurant.builder";
  
describe('Delete Reservation Controller', () => {
    let restaurants: Restaurant[] = [];

    beforeAll(async () => {
        jest.spyOn(db_config, 'pgKnex').mockImplementation(test_knex).mockReturnThis();

        // TODO: create broad test-data
        restaurants = [
            ...Array(20).map(d => new RestaurantBuilder()
                .addReservations(Math.floor((Math.random() * 10)))
                .withCuisine('American')
                .build()
            )
        ];

        await test_knex.insert(restaurants).into('Restaurants');
        await test_knex.insert(restaurants.flatMap(d => d.reservations)).into('Reservations');
    });

    it('should delete a reservation and return 200 status code', async () => {
        // arrange 
        const reservationId = restaurants[0].reservations[0].id;
        // act
        await request(app).delete('/api/reservations/' + reservationId)
            .expect(200)
    });

    // it('should return 404 status code if reservation does not exist', async () => {
    //     const fakeId = uuidv4();

    //     // act
    //     await request(app).delete('/api/reservations/' + fakeId)
    //         .expect(404)
    // });

    // it('should return 500 status code when uuid is invalid', async () => {
    //     const fakeId = 'fakeId';

    //     await request(app).delete('/api/reservations/' + fakeId)
    //         .expect(500)
    // })
    
    afterAll(async () => {
        await test_knex('Restaurants').del();
        await test_knex('Reservations').del();
    });
});

// lets imagine a world where we dont have a database and we just run this one function that filters out the reservation we want to delete
// This is a dummmy function that represents what is happening in our code in the deleteReservation controller
// const deleteReservation = (id: string, data: Restaurant[]) => {
//     const reservations = data.reduce((acc, cur) => [...acc, ...cur.reservations], []);

//     const reservations_filtered = reservations.filter((r) => r.id !== id);
//     if (reservations_filtered.length === reservations.length) {
//         return { status: 404, message: 'Reservation not found' };
//     }

//     return { status: 200, message: 'Reservation deleted' };
// }