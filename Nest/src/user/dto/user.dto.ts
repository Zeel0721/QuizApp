import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Firstname cannot be empty' })
  @IsString({ message: 'Firstname must be string' })
  firstname: string;

  @IsNotEmpty({ message: 'Lastname cannot be empty' })
  @IsString({ message: 'Lastname must be string' })
  lastname: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Error Test result not saved' })
  @IsObject({ message: 'Error Test result not saved' })
  result: {
    score: number;
    max: number;
  };
}
