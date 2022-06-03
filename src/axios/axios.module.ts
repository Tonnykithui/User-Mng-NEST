import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { AxiosController } from './axios.controller';

@Module({
  controllers: [AxiosController],
  providers: [AxiosService]
})
export class AxiosModule {}
