import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import { Question } from "src/schemas/questions.schema";
import { QuestionDto } from "./dto/question.dto";

@Injectable()
export class AdminService{
    constructor(@InjectModel(Question.name) private questionModel: Model<Question>){}

    async getQuestions(){
        return await this.questionModel.find()
    }
    async setQuestion( id: string, updateQuestion: QuestionDto ){
        await this.questionModel.replaceOne({_id: id}, updateQuestion)
        return this.questionModel.find()
    }
    async addQuestion(createQuestionDto: QuestionDto){
        const newQuestion = new this.questionModel(createQuestionDto)
        await newQuestion.save()
        return this.questionModel.find()
    }
    async deleteQuestion( id: string){
        await this.questionModel.deleteOne({ _id:id })
        return await this.questionModel.find()
    }
}