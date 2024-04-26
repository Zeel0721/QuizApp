import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  @IsString({ message: 'Question must be String' })
  @IsNotEmpty({ message: 'Question cannot be empty' })
  question: string;

  @IsString({ message: 'Option A must be String' })
  @IsNotEmpty({ message: 'Option A cannot be empty' })
  optionOne: string;

  @IsString({ message: 'Option B must be String' })
  @IsNotEmpty({ message: 'Option B cannot be empty' })
  optionTwo: string;

  @IsString({ message: 'Option C must be String' })
  @IsNotEmpty({ message: 'Option C cannot be empty' })
  optionThree?: string;

  @IsString({ message: 'Option D must be String' })
  @IsNotEmpty({ message: 'Option D cannot be empty' })
  optionFour?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Answer cannot be empty' })
  answer: string;

  @IsBoolean()
  isRequired?: boolean;

  @IsBoolean()
  isDisabled?: boolean;
}
