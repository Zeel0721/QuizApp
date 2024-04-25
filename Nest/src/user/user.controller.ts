import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}
    @Post('adduser')
    addUser(@Body() createUserDto: UserDto){
        return this.userService.addUser(createUserDto)
    }
    @Get('getuser')
    getUser(){
        return this.userService.getUser()
    }
    @Delete('deleteuser/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }
}