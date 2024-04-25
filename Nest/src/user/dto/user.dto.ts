import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    result: string;
}