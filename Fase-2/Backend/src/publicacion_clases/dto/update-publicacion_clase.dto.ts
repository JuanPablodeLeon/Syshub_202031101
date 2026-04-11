import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionClaseDto } from './create-publicacion_clase.dto';

export class UpdatePublicacionClaseDto extends PartialType(CreatePublicacionClaseDto) {}
