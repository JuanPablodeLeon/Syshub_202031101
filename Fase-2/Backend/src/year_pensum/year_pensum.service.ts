import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateYearPensumDto } from './dto/create-year_pensum.dto';
import { UpdateYearPensumDto } from './dto/update-year_pensum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { YearPensum } from './entities/year_pensum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class YearPensumService {
  constructor(
    @InjectRepository(YearPensum)
    private yearPensumRepository: Repository<YearPensum>,
  ) {}

  async create(createYearPensumDto: CreateYearPensumDto) {
    const existingYear = await this.yearPensumRepository.findOneBy({ year: createYearPensumDto.year });
    if (existingYear) {
      throw new BadRequestException('El año ya existe');
    }
    const yearPensum = this.yearPensumRepository.create(createYearPensumDto);
    return this.yearPensumRepository.save(yearPensum);
  }

  async findAll() {
    return await this.yearPensumRepository.find();
  }

  async findOne(id: number) {
    return await this.yearPensumRepository.findOneBy({ id });
  }

  async update(id: number, updateYearPensumDto: UpdateYearPensumDto) {
    return await this.yearPensumRepository.update(id, updateYearPensumDto);
  }

  async remove(id: number) {
    return await this.yearPensumRepository.softDelete(id);
  }
}
