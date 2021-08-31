import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../config/cache';

export default class RedisCache {
  private redis: RedisClient;

  constructor() {
    this.redis = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  // public async invalidate(key: string): Promise<void> {}
}
