import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('adduser')
  async addUser(@Body() createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }
  @Get('getuser/:page')
  async getUser(@Param('page') page: string) {
    return this.userService.getUser(page);
  }
  @Delete('deleteuser/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Get('getusercount')
  async getUserCount() {
    return this.userService.getUserCount();
  }
  @Get('sortuser/:field/:order/:page')
  async sortUser(
    @Param('field') field: string,
    @Param('order') order: string,
    @Param('page') page: string,
  ) {
    return this.userService.sortUser(field, order, page);
  }
}
