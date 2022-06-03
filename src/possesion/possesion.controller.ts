import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { PossesionService } from './possesion.service';
import { CreatePossesionDto } from './dto/create-possesion.dto';
import { UpdatePossesionDto } from './dto/update-possesion.dto';
import { getUser } from 'src/user/auth/user.decorator';
import { JwtAuthGuard } from 'src/user/auth/auth.guard';
import { Roles } from 'src/user/dto/create-user.dto';
import { RolesRequired } from 'src/user/auth/role.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('possesion')
@UseGuards(JwtAuthGuard)
@RolesRequired(Roles.Admin, Roles.User)
@ApiTags('Possession')
export class PossesionController {
  constructor(private readonly possesionService: PossesionService) {}

  @Post()
  @ApiOperation({summary:'Create a new possession for logged in user'})
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        Name:{
          type:'string',
          description:'Provide item name',
          example:'TV'
        },
        Description:{
          type:'string',
          description:'Provide item overview in detailed form',
          example:'This is the new model of XYG company, fixed with rty latest features'
        },
        Price:{
          type:'integer',
          description:'Value of the item',
          example:'$50'
        },
        YoM:{
          type:'date',
          description:'Date of the manufacture of item',
          example:'02-02-2004'
        }
      }
    }
  })
  @ApiResponse({
    status:200,
    description:'Created records of the user....'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  create(@Body() createPossesionDto: CreatePossesionDto, @getUser() user) {
    if(!createPossesionDto.Description || !createPossesionDto.Name
       || !createPossesionDto.Price || !createPossesionDto.YoM){
      throw new UnauthorizedException("Fill in all the details");
    }

    const d = new Date(createPossesionDto.YoM);

    if(d > new Date(Date.now())){
      throw new HttpException('Year of Manufacture should be not  in the future', HttpStatus.FORBIDDEN);
    }

    return this.possesionService.create(createPossesionDto, user.userid);
  }

  @Get()
  @ApiResponse({
    status:200,
    description:'Fetch records of the LOGGED-IN USER....',
    schema:{
      type:'array',
      properties:{
          Name:{
            type:'string',
            description:'Provide item name',
            example:'TV'
          },
          Description:{
            type:'string',
            description:'Provide item overview in detailed form',
            example:'This is the new model of XYG company, fixed with rty latest features'
          },
          Price:{
            type:'integer',
            description:'Value of the item',
            example:'$50'
          },
          YoM:{
            type:'date',
            description:'Date of the manufacture of item',
            example:'02-02-2004'
          }
        
      }
    }
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  findAll(@getUser() user) {
    return this.possesionService.findAll(user.userid);
  }

  @Get(':id')
  @ApiOperation({summary:'FETCH SINGLE user possession'})
  @ApiParam({
    name:'id',
    type:'string',
    example:'sfbklvjsliwfjees',
    description:'Unique ID of User to FETCH RECORDS OF'
  })
  @ApiResponse({
    status:200,
    description:'Fetch records of the a SINGLE USER....'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  findOne(@Param('id') id: string) {
    return this.possesionService.findOne(id);
  }

  @Post(':id')
  @ApiOperation({summary:'UPDATE user possession'})
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        Name:{
          type:'string',
          description:'Provide item name',
          example:'TV'
        },
        Description:{
          type:'string',
          description:'Provide item overview in detailed form',
          example:'This is the new model of XYG company, fixed with rty latest features'
        },
        Price:{
          type:'integer',
          description:'Value of the item',
          example:'$50'
        },
        YoM:{
          type:'date',
          description:'Date of the manufacture of item',
          example:'02-02-2004'
        }
      }
    }
  })
  @ApiParam({
    name:'id',
    type:'string',
    description:'Unique ID of item to UPDATE',
    example:'shfjkwefklsdfnl'
  })
  @ApiResponse({
    status:204,
    description:'UPDATE records of the user....'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  update(@Param('id') id: string, @Body() updatePossesionDto: Partial<UpdatePossesionDto>) {
    return this.possesionService.update(id, updatePossesionDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'DELETE user possession'})
  @ApiParam({
    name:'id',
    type:'string',
    description:'Unique ID of the item to DELETE',
    example:'sdfrt34ifkfnf'
  })
  @ApiResponse({
    status:204,
    description:'DELETE records of the user....'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
  remove(@Param('id') id: string) {
    return this.possesionService.remove(id);
  }
}
