import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtCons } from './auth/jwtContants.auth';
import { JwtStrategy } from './auth/auth.strategy';
import { AdminController } from './admin.controller';
import { LoginController } from './login.controller';
import { RefreshTokenStrategy } from './auth/refresh.strategy';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}]), 
    JwtModule.register({})
  ],
  controllers: [UserController, AdminController, LoginController],
  providers: [UserService, AuthService, JwtStrategy, RefreshTokenStrategy],
  exports:[UserService]
})
export class UserModule {}
