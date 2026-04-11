import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoEspacioDto } from './create-curso_espacio.dto';

export class UpdateCursoEspacioDto extends PartialType(CreateCursoEspacioDto) {}
