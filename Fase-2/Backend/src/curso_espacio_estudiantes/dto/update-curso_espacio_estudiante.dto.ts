import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoEspacioEstudianteDto } from './create-curso_espacio_estudiante.dto';

export class UpdateCursoEspacioEstudianteDto extends PartialType(CreateCursoEspacioEstudianteDto) {}
