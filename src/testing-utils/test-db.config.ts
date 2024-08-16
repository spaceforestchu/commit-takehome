import knex from "knex";

const database = 'test_resy_db';

export const test_knex = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        password: 'pursuit2022',
        database: database,
    }
})

// const mock_knex = jest.fn().mockImplementation(test_knex);
//         jest.mock('knex', () => mock_knex);