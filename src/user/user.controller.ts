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

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesRequired(Roles.User)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findOne(@getUser() user) : Promise<UserDto>{   
    return await this.userService.findOne(user.userid);
  }

  @Post('update')
  async update(@Body() updateUserDto: Partial<UpdateUserDto>, @getUser() user) {
    return await this.userService.update(user.userid, updateUserDto);
  }

  @Delete()
  async remove(@getUser() user) {
    return await this.userService.remove(user._id);
  }

}
