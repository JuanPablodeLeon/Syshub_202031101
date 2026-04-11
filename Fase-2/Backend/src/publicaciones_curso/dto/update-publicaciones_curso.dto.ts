import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionesCursoDto } from './create-publicaciones_curso.dto';

export class UpdatePublicacionesCursoDto extends PartialType(CreatePublicacionesCursoDto) {}
