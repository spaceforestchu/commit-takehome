import { Reservation } from "../util/types";
import { getRandomEmail, getRandomPhoneNumber } from "./helpers";
import { v4 as uuidv4 } from 'uuid';

// can you generate a reservation builder class that can be used to create a reservation object for testing purposes?
export class ReservationBuilder {
    private reservation: Partial<Reservation>;

    constructor(restaurantId: string) {
        this.reservation = {
            id: uuidv4(),
            restaurantId,
        }
    }

    withFirstName(firstName: string): ReservationBuilder {
        this.reservation.firstName = firstName;
        return this;
    }

    withLastName(lastName: string): ReservationBuilder {
        this.reservation.lastName = lastName;
        return this;
    }

    withPhoneNumber(phoneNumber: string): ReservationBuilder {
        this.reservation.phoneNumber = phoneNumber;
        return this;
    }

    withEmail(email: string): ReservationBuilder {
        this.reservation.email = email;
        return this;
    }

    withTime(time: string): ReservationBuilder {
        this.reservation.time = time;
        return this;
    }

    withNumGuests(numGuests: number): ReservationBuilder {
        this.reservation.numGuests = numGuests;
        return this;
    }

    build(): Reservation {
        return {
            id: this.reservation.id,
            restaurantId: this.reservation.restaurantId,
            createdAt: new Date().toISOString(),
            firstName: this.reservation.firstName || 'John',
            lastName: this.reservation.lastName || 'Doe',
            phoneNumber: this.reservation.phoneNumber || getRandomPhoneNumber(),
            email: this.reservation.email || getRandomEmail(),
            time: this.reservation.time || '20:00:00', // time of day
            numGuests: this.reservation.numGuests || 2,
        }
    }
}