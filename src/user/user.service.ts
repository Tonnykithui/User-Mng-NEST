import { forwardRef, Injectable, UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, Roles } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './dto/login.dto';
import { UserDto } from './dto/userDto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel:Model<UserDocument>,
    private authService:AuthService
    ){}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.authService.registerUser(createUserDto);
    return newUser;
  }

  async loginUser(loginDto:LoginUserDto) {
    const loggedUser = await this.authService.loginUser(loginDto);
    return loggedUser;
  }

  async refreshToken(payload){
    return await this.authService.refreshToken(payload);
  }

  async findAll() : Promise<UserDto[]>{
    return this.userModel.find();
  }

  async findOne(id: string) : Promise<UserDto>{
    const user = await this.userModel.findById({_id:id});
    if(user){
      const newUserDto = this.mapUserToDto(user);
      return  newUserDto;
    } else {
      throw new NotFoundException('Record not found');
    }
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) : Promise<UserDto> {
    const userToUpdate = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
    const updUser = this.mapUserToDto(userToUpdate);
    return updUser;
  }

  async remove(id: string) {
    const deleteAccount = await this.findOneUser(id);
    if(deleteAccount){
      await this.userModel.remove(deleteAccount);
    } else {
      return 'Record deleted';
    }
  }

  async findUserByEmail(email:string){
    const userExists = await this.userModel.find({Email:email});
    return userExists;
  }

  async findOneUser(id:string){
    const userExists = await this.userModel.findOne({_id:id});

    if(!userExists){
      throw new NotFoundException("User does not exists");
    } else {
      return userExists;      
    }

  }

  mapUserToDto(user:User){
    const newUser = new UserDto(user.Name, user.Email, user.DoB, user.Role);
    return newUser;
  }

  @Cron('45 * * * * *')
  async getUserBdayNotify(){
    const users = await this.findAll();
    users.forEach((user) => {
      const dobUser = new Date(user.DoB);
      if(dobUser.getMonth() === new Date(Date.now()).getMonth() && 
         dobUser.getDate() === new Date(Date.now()).getDate()){
           console.log('Sending email to nnotify');
           
         }
    })
  }
}
