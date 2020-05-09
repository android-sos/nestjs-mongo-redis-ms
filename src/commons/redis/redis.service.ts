import { Injectable, Inject, OnApplicationShutdown } from '@nestjs/common';
import * as Redis from 'ioredis';
import { KeyType } from 'ioredis';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  public pubClient;  
  public subClient;

  constructor() {
    this.pubClient = new Redis({
        host:'127.0.0.1',
        port:6379
    });
    const self = this;
    this.pubClient.on('connect', function() {
      console.log('connected');
      // self.pubClient.set('some-key', '42', function(err) {
      //     if (err) {
      //         throw err; /* in production, handle errors more gracefully */
      //     } else {
      //         self.pubClient.get('some-key', function(err, value) {
      //             if (err) {
      //                 throw err;
      //             } else {
      //                 console.log('>' + value);
      //             }
      //         });
      //     }
      // });
  
  });
  }

  get pubClientObject() {
    return this.pubClient;
  }

  public async set(key: KeyType, value: unknown) {
    await this.pubClient.set(key, JSON.stringify(value));
  }

  public async get(key: KeyType) {
    const res = await this.pubClient.get(key);

    return await JSON.parse(res);
  }

  public async del(key: KeyType) {
    return await this.pubClient.del(key);
  }

  onApplicationShutdown(signal: string) {
    this.pubClient.disconnect();
  }
}
