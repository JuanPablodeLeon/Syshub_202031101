import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoPerfilDto } from './create-estado_perfil.dto';

export class UpdateEstadoPerfilDto extends PartialType(CreateEstadoPerfilDto) {}
