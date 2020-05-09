import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersSchema } from './customers.schema';
import { LoggerModule } from '../../../commons/logger/logger.module';
import { RedisModule } from '../../../commons/redis/redis.module';

@Module({
  imports: [
    LoggerModule,
    RedisModule,
    MongooseModule.forFeature([{ name: 'Customers', schema: CustomersSchema }])],
  controllers: [CustomersController],
  providers: [
    CustomersService,
  ],

})
export class CustomersModule {}
