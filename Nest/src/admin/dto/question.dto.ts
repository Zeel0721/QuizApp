import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class QuestionDto{
    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsString()
    optionOne: string;

    @IsNotEmpty()
    @IsString()
    optionTwo: string;

    @IsNotEmpty()
    @IsString()
    optionThree?: string;

    @IsNotEmpty()
    @IsString()
    optionFour?: string;

    @IsNotEmpty()
    @IsNumber()
    answer: string;

    @IsBoolean()
    isRequired?: boolean;

    @IsBoolean()
    isDisabled?: boolean;
}