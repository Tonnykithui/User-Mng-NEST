import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/auth.guard";
import { RolesRequired } from "./auth/role.decorator";
import { getUser } from "./auth/user.decorator";
import { Roles } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller('admin')
@UseGuards(JwtAuthGuard)
@RolesRequired(Roles.Admin)
export class AdminController{

  constructor(private userService:UserService){}

  @Get(':id')
  async findOne(@Param('id') id:string) {
    return await this.userService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('update/:id')
  async updateAsAdmin(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>) {
    return await this.userService.update(id, updateUserDto);
  }
}