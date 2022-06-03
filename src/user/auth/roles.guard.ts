import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Roles } from "../dto/create-user.dto";
import { ROLES_USER } from "./role.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector:Reflector,
        private jwtService:JwtService
        ){}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_USER, [
            context.getHandler(),
            context.getClass()
        ]);

        if(!requiredRoles){
            return true;
        }

        type PayloadType = {
            id:string;
            email: string;
            role:Roles[]
        }

        const jwt = context.switchToHttp().getRequest().rawHeaders[1];

        const legitJwt = this.jwtService.decode(jwt.split(' ')[1]) as PayloadType;
        
        return requiredRoles.some((role) => legitJwt.role?.includes(role));
    }
}