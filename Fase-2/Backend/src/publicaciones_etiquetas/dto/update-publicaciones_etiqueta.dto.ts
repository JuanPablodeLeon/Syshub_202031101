import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionesEtiquetaDto } from './create-publicaciones_etiqueta.dto';

export class UpdatePublicacionesEtiquetaDto extends PartialType(CreatePublicacionesEtiquetaDto) {}
