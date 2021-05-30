import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService){}

  @Post('send')
    create(@Body() message:UserDto):Promise<string>{
      return this.userService.createUser(message)
    }

  @Post('login')
    checkUser(@Body()user:UserDto):Promise<string>{
      return this.userService.checkUser(user)
    }

  @Get('confirm/:id')
    confirmUser(@Param('id')id:string):Promise<string>{
      return this.userService.confirmUser(id)
    }

};
