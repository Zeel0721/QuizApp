import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async addUser(createUserDto: UserDto) {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return this.userModel.find();
  }
  async getUser(page: number) {
    return this.userModel
      .find()
      .skip((page - 1) * 4)
      .limit(4);
  }
  async deleteUser(id: string) {
    await this.userModel.deleteOne({ _id: id });
    return this.userModel.find();
  }
  async getUserCount() {
    return this.userModel.countDocuments();
  }
  async sortUser(field: string, order: string, page: number) {
    const sortOrder = order === 'ascend' ? 1 : -1;
    return this.userModel
      .find()
      .sort({ [field]: sortOrder })
      .skip((page - 1) * 4)
      .limit(4);
  }
}
