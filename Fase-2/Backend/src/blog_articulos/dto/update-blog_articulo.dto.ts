import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogArticuloDto } from './create-blog_articulo.dto';

export class UpdateBlogArticuloDto extends PartialType(CreateBlogArticuloDto) {}
