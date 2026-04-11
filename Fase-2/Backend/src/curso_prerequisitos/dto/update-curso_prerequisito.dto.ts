import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoPrerequisitoDto } from './create-curso_prerequisito.dto';

export class UpdateCursoPrerequisitoDto extends PartialType(CreateCursoPrerequisitoDto) {}
