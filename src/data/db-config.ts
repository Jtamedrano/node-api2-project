import knex from 'knex';
import configs from '../knexfile';
const environment = process.env.NODE_ENV || 'development';

const db = knex(configs[environment]);

export default db;