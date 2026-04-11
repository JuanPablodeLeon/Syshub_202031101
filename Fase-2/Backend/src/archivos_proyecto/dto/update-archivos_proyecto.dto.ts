import { PartialType } from '@nestjs/mapped-types';
import { CreateArchivosProyectoDto } from './create-archivos_proyecto.dto';

export class UpdateArchivosProyectoDto extends PartialType(CreateArchivosProyectoDto) {}
