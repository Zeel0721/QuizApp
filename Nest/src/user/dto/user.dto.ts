import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class UserDto {
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
  @IsObject()
  result: {
    score: number;
    max: number;
  };
}
