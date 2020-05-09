import * as mongoose from 'mongoose';

export const CustomersSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
});