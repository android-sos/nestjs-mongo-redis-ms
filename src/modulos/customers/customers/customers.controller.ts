import { Controller, Get, Post, Put, Delete, Query, Res, Param, NotFoundException, HttpStatus, Body } from '@nestjs/common';
import { ICustomer } from './customer.interface';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './customers.schema/dto/customer.create';
import { LoggerService } from '../../../commons/logger/logger.service';
import { RedisService } from '../../../commons/redis/redis.service';

@Controller('customer')
export class CustomersController {
    constructor(
        private readonly customersService: CustomersService,
        private loggerService:LoggerService,
        private redisService: RedisService,
        ) {
            this.loggerService.setContext('Customers');
        }
    @Get()
    async findAll(): Promise<ICustomer[]> {
      this.loggerService.info('1Lista de CLiente Enviada');
      console.log(this.redisService.get('edad'));
      return await this.customersService.findAll();
    }

    @Get('/:customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customersService.getCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json(customer);
    }

    @Post('/create')
    async addCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.customersService.addCustomer(createCustomerDTO);
        return res.status(HttpStatus.OK).json({
            message: "Customer has been created successfully",
            customer
        })
    }

    @Put('/update')
    async updateCustomer(@Res() res, @Query('customerID') customerID, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.customersService.updateCustomer(customerID, createCustomerDTO);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been successfully updated',
            customer
        });
    }

    // Delete a customer
    @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
        console.log('>>'+ customerID);
        const customer = await this.customersService.deleteCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer
        })
    }
}
