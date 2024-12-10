import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on('error', (err) => {
            console.error(`Redis client error: ${err}`);
        });

        this.client.connect().catch(console.error);
    }

    isAlive() {
        return this.client.isOpen;
    }

    async get(key) {
        try {
            return await this.client.get(key);
        } catch (err) {
            console.error(`Redis GET error: ${err}`);
            return null;
        }
    }

    async set(key, value, duration) {
        try {
            await this.client.set(key, value, 'EX', duration);
        } catch (err) {
            console.error(`Redis SET error: ${err}`);
        }
    }
    // delete function
    async del(key) {
        try {
            await this.client.del(key);
        } catch (err) {
            console.error(`Redis DEL error: ${err}`);
        }
    }
}

const redisClient = new RedisClient();
export default redisClient;
