import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionesForoDto } from './create-publicaciones_foro.dto';

export class UpdatePublicacionesForoDto extends PartialType(CreatePublicacionesForoDto) {}
