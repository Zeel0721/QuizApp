import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionSchema } from "src/schemas/questions.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ 
            name: Question.name, schema: QuestionSchema
        }]),
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule {}