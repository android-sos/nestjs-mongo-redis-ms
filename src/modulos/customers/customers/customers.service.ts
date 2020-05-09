import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ICustomer } from './customer.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDTO } from './customers.schema/dto/customer.create';
import { RedisService } from '../../../commons/redis';


@Injectable()
export class CustomersService {
  constructor(@InjectModel('Customers') private customersModel: Model<ICustomer>,
  private redisService: RedisService
  ) {}
    
  async findAll(): Promise<ICustomer[]> {
    
    const key = await this.redisService.get('some-key');
    console.log(key);
    
    return this.customersModel.find().exec();
  }

  async getCustomer(customerID): Promise<ICustomer> {
    const customer = await this.customersModel.findById(customerID).exec();
    return customer;
  }
// post a single customer
async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<ICustomer> {
    console.log(createCustomerDTO);
    const newCustomer = await new this.customersModel(createCustomerDTO);
    return newCustomer.save();
}
// Edit customer details
async updateCustomer(customerID, createCustomerDTO: CreateCustomerDTO): Promise<ICustomer> {
    const updatedCustomer = await this.customersModel
        .findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
    return updatedCustomer;
}
// Delete a customer
async deleteCustomer(customerID): Promise<any> {
    const deletedCustomer = await this.customersModel.findByIdAndRemove({ _id: customerID});
    return deletedCustomer;
}
}
