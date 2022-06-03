import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { CreateAxioDto } from './dto/create-axio.dto';
import { UpdateAxioDto } from './dto/update-axio.dto';

@Controller('axios')
export class AxiosController {
  constructor(private readonly axiosService: AxiosService) {}

  @Post()
  create(@Body() createAxioDto: CreateAxioDto) {
    return this.axiosService.create(createAxioDto);
  }

  @Get()
  findAll() {
    return this.axiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.axiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAxioDto: UpdateAxioDto) {
    return this.axiosService.update(+id, updateAxioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.axiosService.remove(+id);
  }
}
