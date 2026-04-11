import { PartialType } from '@nestjs/mapped-types';
import { CreateYearPensumDto } from './create-year_pensum.dto';

export class UpdateYearPensumDto extends PartialType(CreateYearPensumDto) {}
