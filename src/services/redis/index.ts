import { createClient } from 'redis';

const client = createClient()
.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));


export default client;
