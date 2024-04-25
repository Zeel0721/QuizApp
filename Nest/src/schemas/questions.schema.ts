import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Question{
    @Prop({unique: true, required: true})
    question: string

    @Prop({required: true})
    optionOne: string
    
    @Prop({required: true})
    optionTwo: string
    
    @Prop({required: true})
    optionThree?: string
    
    @Prop({required: true})
    optionFour?: string

    @Prop({required: true})
    answer: number

    @Prop()
    isRequired?: boolean

    @Prop()
    isDisabled?: boolean
}

export const QuestionSchema = SchemaFactory.createForClass(Question)