import { PartialType } from '@nestjs/mapped-types';
import { CreateCursosDisponibleDto } from './create-cursos_disponible.dto';

export class UpdateCursosDisponibleDto extends PartialType(CreateCursosDisponibleDto) {}
