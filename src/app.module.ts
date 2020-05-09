import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modulos/customers/customers/customers.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './commons/redis/redis.module';

// 'mongodb://127.0.0.1:27017/inventary_db'
@Module({

  imports: [
    CustomersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: ['.prod.env', '.cert.env', '.desa.env','.local.env'],
      })],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
        useFindAndModify: false,
        useNewUrlParser: true,
        autoReconnect: false
      }),
      inject: [ConfigService]
    }),
    RedisModule.registerAsync ({
      imports: [ConfigModule.forRoot({
        envFilePath: ['.prod.env', '.cert.env', '.desa.env','.local.env'],
      })],
      useFactory: (configService: ConfigService) => ({
        host:'127.0.0.1',
        port:6379
      }),
      inject: [ConfigService]
    })
    
  ],
  controllers: [
    // AppController,
  ]

})
export class ApplicationModule {
  constructor() {}
}
