import { Controller, Post, Body, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "./auth/user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UserService } from "./user.service";
import { sendEmail } from "./utils/sendMail";

@Controller('auth')
export class LoginController{
    constructor(private userService:UserService){}
    
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const checkEmailCorrect = this.ValidateEmail(createUserDto.Email);
    if(checkEmailCorrect == false){
      throw new UnauthorizedException("Please use valid email");
    }

    if(!createUserDto.Name || !createUserDto.Email || !createUserDto.Password || 
      !createUserDto.ConfirmPassword || !createUserDto.DoB ){
        throw new UnauthorizedException("Fill in all the required details.");
      }

    if(createUserDto.ConfirmPassword !== createUserDto.Password){
      throw new  UnauthorizedException("Passwords do not match");
    }

    return await this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto:LoginUserDto){
    const checkEmailCorrect = this.ValidateEmail(loginDto.Email);

    if(!loginDto.Email || !loginDto.Password){
      throw new UnauthorizedException("Fill in all login details");
    }

    await sendEmail(loginDto.Email);
    return await this.userService.loginUser(loginDto);
  }


  //@UseGuards(AuthGuard('jwt-strategy'))
  @Post('refresh-token')
  async refreshToken(@getUser() user){
    console.log(user);
    return await this.userService.refreshToken(user);
  }

  ValidateEmail(mail:string) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
      } else {
        return false;
      }
  }
}