import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YearPensumService } from './year_pensum.service';
import { CreateYearPensumDto } from './dto/create-year_pensum.dto';
import { UpdateYearPensumDto } from './dto/update-year_pensum.dto';


@Controller('year-pensum')
export class YearPensumController {
  constructor(private readonly yearPensumService: YearPensumService) {}

  @Post()
  create(@Body() createYearPensumDto: CreateYearPensumDto) {
    return this.yearPensumService.create(createYearPensumDto);
  }

  @Get()
  findAll() {
    return this.yearPensumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.yearPensumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateYearPensumDto: UpdateYearPensumDto) {
    return this.yearPensumService.update(+id, updateYearPensumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.yearPensumService.remove(+id);
  }
}
