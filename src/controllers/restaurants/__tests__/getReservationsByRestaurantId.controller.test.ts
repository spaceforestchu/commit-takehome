import request from "supertest";
import { app } from '../../../server';

const { v4: uuidv4 } = require('uuid');

describe('Get Reservations By RestaurantId Controller', () => {
    beforeAll(async () => {
    });

    it('should return 200 with reservation array', async () => {
    });

    it('should return 404 if the reservation does not exist', async () => {
    });

    it('should return 500 if id param not a proper uuid', async () => {

    })
});