import { LoremIpsum } from "lorem-ipsum";
import { Restaurant } from "../util/types";
import { RestaurantBuilder } from "./restaurant.builder";
import { test_knex } from "./test-db.config";

export function getRandomPhoneNumber(): string {
    return `(${Math.floor(Math.random() * 900) + 100})${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 9000) + 1000}`;
}

export function getRandomEmail(): string {
    return `${Math.random().toString(36).substring(2, 15)}@${Math.random().toString(36).substring(2, 15)}.com`;
}

export function getRandomCuisine(): string {
    const cuisines = ['American', 'Chinese', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Vietnamese', 'German', 'Venezuelan'];
    return cuisines[Math.floor(Math.random() * cuisines.length)];
}

export const loremHelper = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});


export async function loadBasicFixture() {
    const restaurants = [...Array(200)].map(() => new RestaurantBuilder()
        .addReservations(5)
        .build()); 

    // directly load data to test database
    await test_knex.insert(restaurants).into('restaurants');
    await test_knex.insert(restaurants.flatMap(d => d.reservations)).into('reservations');
}

// SEATGEEK EXAMPLE
// function seatgeekFixture(percentForSale, percentSoldOut, percentInProcess) {
//     const tickets = [...Array(100)].map(() => {
//         const random = Math.random();
//         if (random < percentForSale) {
//             return new TicketBuilder().withStatus('for_sale').build();
//         } else if (random < percentForSale + percentSoldOut) {
//             return new TicketBuilder().withStatus('sold_out').build();
//         } else {
//             return new TicketBuilder().withStatus('in_process').build();

//         }
//     }

//     // directly load data to test database
//     await test_knex.insert(tickets).into('tickets');
// }

