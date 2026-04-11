import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogRespuestaDto } from './create-blog_respuesta.dto';

export class UpdateBlogRespuestaDto extends PartialType(CreateBlogRespuestaDto) {}
