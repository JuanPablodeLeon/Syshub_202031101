import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialExtraDto } from './create-material_extra.dto';

export class UpdateMaterialExtraDto extends PartialType(CreateMaterialExtraDto) {}
