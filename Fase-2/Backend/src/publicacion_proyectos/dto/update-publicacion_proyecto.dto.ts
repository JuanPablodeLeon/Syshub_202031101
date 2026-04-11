import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionProyectoDto } from './create-publicacion_proyecto.dto';

export class UpdatePublicacionProyectoDto extends PartialType(CreatePublicacionProyectoDto) {}
