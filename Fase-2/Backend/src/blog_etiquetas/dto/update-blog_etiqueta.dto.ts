import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogEtiquetaDto } from './create-blog_etiqueta.dto';

export class UpdateBlogEtiquetaDto extends PartialType(CreateBlogEtiquetaDto) {}
