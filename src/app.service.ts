import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Roles } from './user/dto/create-user.dto';

@Injectable()
export class AppService{}
// constructor(private userService:UserService){}

  // async onModuleInit() {
  //   const admin = {
  //     Name:"Admin",
  //     Email:"admin@gmail.com",
  //     Password:"admin1234",
  //     ConfirmPassword:"admin1234",
  //     DoB:null,
  //     Role:Roles[0]
  //   }

  //   const adminExists = await this.userService.findUserByEmail(admin.Email);
  //   if(!adminExists){
  //     await this.userService.create(admin);
  //     console.log("User created");
  //   }
  // }
