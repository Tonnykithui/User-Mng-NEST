import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, Roles } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtAuthGuard } from './auth/auth.guard';
import { RolesRequired } from './auth/role.decorator';
import { getUser } from './auth/user.decorator';
import { RolesGuard } from './auth/roles.guard';
import { UserDto } from './dto/userDto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesRequired(Roles.User)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({summary:'Get a users profile'})
  @ApiParam({
    name:'Bearer-Token',
    type:'string',
    example:'fdsihoi22343490tfdsgr.wee2obngjnvb',
    description:'Generated on user login or registration'
  })
  @ApiResponse({
    status:200,
    description:'Fetched logged in users profile'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  async findOne(@getUser() user) : Promise<UserDto>{   
    return await this.userService.findOne(user.userid);
  }

  @Post('update')
  @ApiOperation({summary:'Update user details'})
  @ApiParam({
    name:'id',
    type:'string',
    example:'sfdejfdn9rfn',
    description:'Unique id of the user to update'
  })
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        Name:{
          type:'string',
          description:'Name of the user to update',
          example:'Maui'
        },
        Email:{
          type:'string',
          description:'Email of the user to update',
          example:'maui@gmail.com'
        },
        DoB:{
          type:'date',
          description:'DoB of the user to update',
          example:'02-04-2000'
        }
      }
    }
  })
  @ApiResponse({
    status:204,
    description:'User record successfully updated'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  async update(@Body() updateUserDto: Partial<UpdateUserDto>, @getUser() user) {
    return await this.userService.update(user.userid, updateUserDto);
  }

  @Delete()
  @ApiOperation({summary:'Deleting a users record'})
  @ApiResponse({
    status:200,
    description:'Record deleted'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  async remove(@getUser() user) {
    return await this.userService.remove(user._id);
  }

}