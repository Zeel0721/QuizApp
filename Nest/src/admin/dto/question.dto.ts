import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty({ message: 'Question cannot be empty' })
  @IsString({ message: 'Question must be String' })
  question: string;

  @IsNotEmpty({ message: 'Option A cannot be empty' })
  @IsString({ message: 'Option A must be String' })
  optionOne: string;

  @IsNotEmpty({ message: 'Option B cannot be empty' })
  @IsString({ message: 'Option B must be String' })
  optionTwo: string;

  @IsNotEmpty({ message: 'Option C cannot be empty' })
  @IsString({ message: 'Option C must be String' })
  optionThree?: string;

  @IsNotEmpty({ message: 'Option D cannot be empty' })
  @IsString({ message: 'Option D must be String' })
  optionFour?: string;

  @IsNotEmpty({ message: 'Answer cannot be empty' })
  @IsNumber()
  answer: string;

  @IsBoolean()
  isRequired?: boolean;

  @IsBoolean()
  isDisabled?: boolean;
}
