import { Controller, Post, Body, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { getUser } from "./auth/user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UserService } from "./user.service";
import { sendEmail } from "./utils/sendMail";

@Controller('auth')
@ApiTags('Auth')
export class LoginController{
    constructor(private userService:UserService){}
    
  @Post('register')
  @ApiOperation({summary:'Register user in the system'})
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
          },
          Password:{
            type:'string',
            description:'Registering users Password',
            example:'maui234'
          },
          ConfirmPassword:{
            type:'string',
            description:'Registering users Password repeated',
            example:'maui234'
          }
      }
    }
  })
  @ApiResponse({
    status:200,
    description:'Registered a new user'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
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
  @ApiOperation({summary:'Login user in the system'})
  @ApiBody({
    schema:{
      type:'object',
      properties:{
          Email:{
            type:'string',
            description:'Email of the user to update',
            example:'maui@gmail.com'
          },
          Password:{
            type:'string',
            description:'Registering users Password',
            example:'maui234'
          }
      }
    }
  })
  @ApiResponse({
    status:200,
    description:'Login user'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
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
  @ApiOperation({summary:'Get refresh token for user'})
  @ApiParam({
    name:'refresh-token',
    type:'string',
    example:'sdfjskfjekn.354sjkldsfflsd',
    description:'The refresh-token attached on login'
  })
  @ApiResponse({
    status:200,
    description:'Get refresh token for user'
  })
  @ApiResponse({
    status:500,
    description:'Internal server error'
  })
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