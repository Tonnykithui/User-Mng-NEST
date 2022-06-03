import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { RolesRequired } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/dto/create-user.dto";
import { PossesionService } from "./possesion.service";

@Controller('useritems')
@UseGuards(JwtAuthGuard)
@RolesRequired(Roles.Admin)
@ApiTags('ADMIN POSSESSION')
export class AdminPossesionController{

    constructor(private possesionService:PossesionService){}
    
    @Get()
    @ApiOperation({summary:'Get ADMINS possession'})
    @ApiResponse({
        status:200,
        description:'Fetch records of the LOGGED-IN USER....',
        schema:{
          type:'array',
          properties:{
              Name:{
                type:'string',
                description:'Provide item name',
                example:'TV'
              },
              Description:{
                type:'string',
                description:'Provide item overview in detailed form',
                example:'This is the new model of XYG company, fixed with rty latest features'
              },
              Price:{
                type:'integer',
                description:'Value of the item',
                example:'$50'
              },
              YoM:{
                type:'date',
                description:'Date of the manufacture of item',
                example:'02-02-2004'
              }
            
          }
        }
      })
    @ApiResponse({
        status:500,
        description:'Internal server error'
    })
    async findAdminsPossesion(@getUser() user){
        return await this.possesionService.findAll(user.userid);
    }

    @Get(':id')
    @ApiOperation({summary:'Get users possession by ADMIN'})
    @ApiResponse({
        status:200,
        description:'Fetch records for a USER....',
        schema:{
          type:'array',
          properties:{
              Name:{
                type:'string',
                description:'Provide item name',
                example:'TV'
              },
              Description:{
                type:'string',
                description:'Provide item overview in detailed form',
                example:'This is the new model of XYG company, fixed with rty latest features'
              },
              Price:{
                type:'integer',
                description:'Value of the item',
                example:'$50'
              },
              YoM:{
                type:'date',
                description:'Date of the manufacture of item',
                example:'02-02-2004'
              }
            
          }
        }
      })
    @ApiResponse({
        status:500,
        description:'Internal server error'
    })
    async findUsersPossesion(@Param('id') id:string){
        return await this.possesionService.findAll(id);
    }
}