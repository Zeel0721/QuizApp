import { Injectable } from "@nestjs/common";
import { User } from "src/schemas/users.schema";
import { Model } from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel: Model<User>){}
    async addUser(createUserDto: UserDto){
        const newUser = new this.userModel(createUserDto)
        await newUser.save()
        return await this.userModel.find()
    }
    async getUser(){
        return await this.userModel.find()
    }
    async deleteUser(id: string){
        await this.userModel.deleteOne({ _id: id })
        return await this.userModel.find()
    }
}