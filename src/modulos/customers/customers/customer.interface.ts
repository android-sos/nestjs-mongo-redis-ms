import { Document } from "mongoose";

export interface ICustomer extends Document{
    firstname: String,
    lastname: String,
}