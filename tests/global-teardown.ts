import Knex from 'knex'

const database = 'test_resy_db'

module.exports = async () => {
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
      process.exit(0);
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }