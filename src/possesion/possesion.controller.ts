import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { PossesionService } from './possesion.service';
import { CreatePossesionDto } from './dto/create-possesion.dto';
import { UpdatePossesionDto } from './dto/update-possesion.dto';
import { getUser } from 'src/user/auth/user.decorator';
import { JwtAuthGuard } from 'src/user/auth/auth.guard';
import { Roles } from 'src/user/dto/create-user.dto';
import { RolesRequired } from 'src/user/auth/role.decorator';

@Controller('possesion')
@UseGuards(JwtAuthGuard)
@RolesRequired(Roles.Admin, Roles.User)
export class PossesionController {
  constructor(private readonly possesionService: PossesionService) {}

  @Post()
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
  findAll(@getUser() user) {
    return this.possesionService.findAll(user.userid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.possesionService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePossesionDto: Partial<UpdatePossesionDto>) {
    return this.possesionService.update(id, updatePossesionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.possesionService.remove(id);
  }
}
