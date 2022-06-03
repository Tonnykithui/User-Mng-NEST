import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/auth.guard";
import { RolesRequired } from "./auth/role.decorator";
import { getUser } from "./auth/user.decorator";
import { Roles } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller('admin')
@UseGuards(JwtAuthGuard)
@RolesRequired(Roles.Admin)
@ApiTags('Admin')
export class AdminController{

  constructor(private userService:UserService){}

  @Get(':id')
  @ApiOperation({summary:'Get a users details'})
  @ApiParam({
    name:'id',
    type:'string',
    example:'sfwfkdnflknsd',
    description:'Provide unique ID for the user to fetch records'
  })
  @ApiResponse({
    status:200,
    description:'Fetched records of the user....'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  async findOne(@Param('id') id:string) {
    return await this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({summary:'Get ALL USERS details'})
  @ApiResponse({
    status:200,
    description:'Fetched records of ALL user....',
    schema:{
      type:'array',
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
    status:500,
    description:'Internal server error'
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('update/:id')
  @ApiOperation({summary:'UPD user records'})
  @ApiParam({
    name:'id',
    type:'string',
    description:'Unique ID of User to update',
    example:'dsfjerlvnvn'
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
    status:200,
    description:'Updated user records....'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  async updateAsAdmin(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>) {
    return await this.userService.update(id, updateUserDto);
  }
}