import { IsNotEmpty } from "class-validator";

export class CreateCustomerDTO {
    @IsNotEmpty()
    readonly firstname: String;
    
    @IsNotEmpty()
    readonly lastname: String;
}