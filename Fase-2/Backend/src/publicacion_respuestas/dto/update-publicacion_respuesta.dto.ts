import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionRespuestaDto } from './create-publicacion_respuesta.dto';

export class UpdatePublicacionRespuestaDto extends PartialType(CreatePublicacionRespuestaDto) {}
