import {
    Body,
    Controller,
    Post,
    Response,
    Request,
    HttpStatus,
    Get,
    UseGuards,
    Query,
    Param,
    Put
  } from '@nestjs/common';


  import { UserService } from './user.service';
  import { AddUserDTO, SignInUserDTO } from './user.dto';
  @Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('/')
  async add(@Body() obj: AddUserDTO, @Response() res, @Request() req) {
    
      const response = await this.userService.addUser(obj);
      return res.status(HttpStatus.OK).json({
        ...response
      });
    
  }

  @Get('/')
  async signIn(@Query() obj: SignInUserDTO, @Response() res, @Request() req) {
    
      const response = await this.userService.signInUser(obj);
      return res.status(HttpStatus.OK).json({
        ...response
      });
    
  }
 

}
