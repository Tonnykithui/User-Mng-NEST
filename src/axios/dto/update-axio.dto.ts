import { PartialType } from '@nestjs/mapped-types';
import { CreateAxioDto } from './create-axio.dto';

export class UpdateAxioDto extends PartialType(CreateAxioDto) {}
