import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoEtiquetaDto } from './create-proyecto_etiqueta.dto';

export class UpdateProyectoEtiquetaDto extends PartialType(CreateProyectoEtiquetaDto) {}
