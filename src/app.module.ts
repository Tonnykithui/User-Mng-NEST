import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PossesionModule } from './possesion/possesion.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/auth/roles.guard';
import { AxiosModule } from './axios/axios.module';

@Module({
  imports: [UserModule, PossesionModule, AxiosModule,
     MongooseModule.forRoot('mongodb://localhost:27017/userpossesion'),
     AxiosModule],
  controllers: [AppController],
  providers: [AppService, JwtService,
    {
      provide:APP_GUARD,
      useClass:RolesGuard
    }],
})
export class AppModule{}
// export class AppModule implements OnModuleInit{
//   constructor(private ppService:AppService){}
//   onModuleInit() {
//     console.log('Writing to db');
    
//     this.ppService.onModuleInit();

//     console.log('written to db');
    
//   }





