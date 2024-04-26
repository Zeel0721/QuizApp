import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('adduser')
  addUser(@Body() createUserDto: UserDto) {
    return this.userService.addUser(createUserDto);
  }
  @Get('getuser/:page')
  getUser(@Param('page', ParseIntPipe) page: number) {
    return this.userService.getUser(page);
  }
  @Delete('deleteuser/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Get('getusercount')
  getUserCount() {
    return this.userService.getUserCount();
  }
  @Get('sortuser/:field/:order/:page')
  sortUser(
    @Param('field') field: string,
    @Param('order') order: string,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.userService.sortUser(field, order, page);
  }
}
