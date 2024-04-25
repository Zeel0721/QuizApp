import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { QuestionDto } from "./dto/question.dto";

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}
    @Get('getquestions')
    async getQuestions(){
        return this.adminService.getQuestions()
    }
    @Put('setquestion/:id')
    async setQuestion(@Param('id') id: string,@Body() updateQuestion: QuestionDto){
        return this.adminService.setQuestion(id, updateQuestion)
    }
    @Post('addquestion')
    async addQuestion(@Body() createQuestionDto: QuestionDto){
        return this.adminService.addQuestion(createQuestionDto)
    }
    @Delete('deletequestion/:id')
    async deleteQuestion(@Param('id') id: string){
        return this.adminService.deleteQuestion(id)
    }
}