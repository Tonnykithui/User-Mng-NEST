import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { RolesRequired } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/dto/create-user.dto";
import { PossesionService } from "./possesion.service";

@Controller('useritems')
@UseGuards(JwtAuthGuard)
@RolesRequired(Roles.Admin)
export class AdminPossesionController{

    constructor(private possesionService:PossesionService){}
    
    @Get()
    async findAdminsPossesion(@getUser() user){
        return await this.possesionService.findAll(user.userid);
    }

    @Get(':id')
    async findUsersPossesion(@Param('id') id:string){
        return await this.possesionService.findAll(id);
    }
}