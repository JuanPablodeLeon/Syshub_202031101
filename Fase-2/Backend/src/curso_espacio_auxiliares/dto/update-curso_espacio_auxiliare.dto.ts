import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoEspacioAuxiliareDto } from './create-curso_espacio_auxiliare.dto';

export class UpdateCursoEspacioAuxiliareDto extends PartialType(CreateCursoEspacioAuxiliareDto) {}
