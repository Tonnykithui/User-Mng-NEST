import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto, Roles } from "../dto/create-user.dto";
import { UserService } from "../user.service";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "../dto/login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../entities/user.entity";
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { jwtCons } from "./jwtContants.auth";

@Injectable()
export class AuthService{
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>,
        private jwtService:JwtService
        ){}
    //REGISTER 
    async registerUser(createUserDto: CreateUserDto){

        const emailExists = await this.userModel.findOne({Email:createUserDto.Email});
        if(emailExists){
            throw new UnauthorizedException("Please use another email to register");
        }
          createUserDto.Role = [Roles.User];
      
          const round = 10;
          const hashedPassword = await bcrypt.hash(createUserDto.Password, round);
      
          //USER
          const user = {
            Name:createUserDto.Name,
            Email:createUserDto.Email,
            Password:hashedPassword,
            DoB:createUserDto.DoB,
            Role:createUserDto.Role
          }

          //ADMIN
          const p = 'admin1234';
          const adminP = await bcrypt.hash(p,round);

          const admin = {
            Name:"Admin",
            Email:"admin@gmail.com",
            Password:adminP,
            DoB:null,
            Role:[Roles.Admin]
           }

           const adminExists = await this.userModel.findOne({Email:admin.Email});

           if(!adminExists){
               const newAdmin = new this.userModel(admin);
               console.log("User created");
               newAdmin.save();
            }

          const newUser = new this.userModel(user);

          const savedUser = await newUser.save();

          const payload = { sub:savedUser._id, email:savedUser.Email, role:savedUser.Role};

          return {
              token:await this.generateToken(payload)
            };
    }

    //LOGIN
    async loginUser(loginUserDto: LoginUserDto){
        const userExists = await this.findByEmail(loginUserDto.Email);

        //check passwords match
        const passwordsMatch = await bcrypt.compare(loginUserDto.Password, userExists.Password);

        if(!passwordsMatch){
            throw new UnauthorizedException("Provide correct login details");
        }

        const payload = { sub:userExists._id, email:userExists.Email, role:userExists.Role };
        
        return {
            token: await this.generateToken(payload)
        };
    }

    async refreshToken(payload){
        const token = await this.generateToken(payload);
        return token;
    }

    async generateToken(payload){
        const [ac, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret:jwtCons,
                expiresIn:60*5
            }),
            this.jwtService.signAsync(payload, {
                secret:'Thisismyrefreshtokenkey',
                expiresIn:60*60*24*7
            })
        ])
        
        return {
            access_token:ac,
            refresh_token:rt
        };
    }

    async findByEmail(email:string){
        //check email does exists
        const emailExists = await this.userModel.findOne({Email:email});
        
        //Throw error if does not exists
        if(!emailExists){
            throw new NotFoundException("User does not exists,Provide correct credentials");
        }

        //return user
        return emailExists;
    }
}