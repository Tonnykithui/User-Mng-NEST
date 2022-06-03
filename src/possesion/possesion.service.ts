import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getUser } from 'src/user/auth/user.decorator';
import { CreatePossesionDto } from './dto/create-possesion.dto';
import { UpdatePossesionDto } from './dto/update-possesion.dto';
import { Possesion, PossesionDocument } from './entities/possesion.entity';

@Injectable()
export class PossesionService {
  
  constructor(@InjectModel(Possesion.name) private possesionModel:Model<PossesionDocument>){}

  async create(createPossesionDto: CreatePossesionDto, id:string) {
    createPossesionDto.OwnerId = id;
    return await this.possesionModel.create(createPossesionDto);
  }

  async findAll(id:string) {
    return await this.possesionModel.find({OwnerId:id});
  }

  async findOne(id: string) {
    return await this.possesionModel.find({_id:id})
  }

  async update(id: string, updatePossesionDto: Partial<UpdatePossesionDto>) {
    return await this.possesionModel.findByIdAndUpdate(id, updatePossesionDto, { new:true });
  }

  async remove(id: string) {
    return await this.possesionModel.remove({_id:id});
  }
}
