import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioCarreraDto } from './create-usuario_carrera.dto';

export class UpdateUsuarioCarreraDto extends PartialType(CreateUsuarioCarreraDto) {}
