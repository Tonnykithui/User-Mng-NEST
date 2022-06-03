import { PartialType } from '@nestjs/mapped-types';
import { CreatePossesionDto } from './create-possesion.dto';

export class UpdatePossesionDto extends PartialType(CreatePossesionDto) {}
