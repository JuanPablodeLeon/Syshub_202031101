import { PartialType } from '@nestjs/mapped-types';
import { CreateClasesGrabadaDto } from './create-clases_grabada.dto';

export class UpdateClasesGrabadaDto extends PartialType(CreateClasesGrabadaDto) {}
