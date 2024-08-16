import Knex from 'knex'
import { test_knex } from '../src/testing-utils/test-db.config'
const database = 'test_resy_db'

// Create the database
async function createTestDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      password: 'pursuit2022',
    }
  })

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`)
    await knex.raw(`CREATE DATABASE ${database}`)
  } catch (error) {
    throw new Error(error)
  } finally {
    await knex.destroy()
  }
}

// Seed the database with schema and data
async function seedTestDatabase() {
  try {
    // this step is necessary to ensure that the tables are loaded into the database
    await test_knex.raw(`
      CREATE TYPE dining_option AS ENUM ('Delivery Only', 'Takeout Only');
      CREATE TYPE price AS ENUM ('$', '$$', '$$$', '$$$$');

      CREATE TABLE IF NOT EXISTS "Restaurants" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "name" text NOT NULL,
          "description" text NOT NULL,
          "phoneNumber" varchar(255),
          "openingTime" TIME NOT NULL,
          "closingTime" TIME NOT NULL,
          "location" text NOT NULL,
          "cuisine" text NOT NULL,
          "price" varchar(4),
          "diningRestriction" varchar(25),  
          "tables" jsonb
      );

      CREATE TABLE IF NOT EXISTS "Reservations" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "firstName" text NOT NULL,
          "lastName" text NOT NULL,
          "phoneNumber" varchar(255) NOT NULL,
          "email" varchar(255),
          "time" TIMESTAMP NOT NULL,
          "numGuests" int NOT NULL,
          "restaurantId" uuid NOT NULL REFERENCES "Restaurants" (id) ON DELETE CASCADE 
      ); 
    `);
  } catch (error) {
    throw new Error(error)
  } finally {
    await test_knex.destroy()
  }
}

module.exports = async () => {
  try {
    await createTestDatabase()
    await seedTestDatabase()
    console.log('Test database created successfully')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}