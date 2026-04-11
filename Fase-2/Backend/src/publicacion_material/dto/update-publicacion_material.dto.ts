import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionMaterialDto } from './create-publicacion_material.dto';

export class UpdatePublicacionMaterialDto extends PartialType(CreatePublicacionMaterialDto) {}
