import { Module } from '@nestjs/common';
import { PossesionService } from './possesion.service';
import { PossesionController } from './possesion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Possesion, PossesionSchema } from './entities/possesion.entity';
import { Model } from 'mongoose';
import { AdminPossesionController } from './admin.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:Possesion.name, schema:PossesionSchema}])],
  controllers: [PossesionController, AdminPossesionController],
  providers: [PossesionService]
})
export class PossesionModule {}
