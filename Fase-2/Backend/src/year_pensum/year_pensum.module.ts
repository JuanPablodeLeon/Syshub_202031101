import { Module } from '@nestjs/common';
import { YearPensumService } from './year_pensum.service';
import { YearPensumController } from './year_pensum.controller';
import { YearPensum } from './entities/year_pensum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([YearPensum])],
  controllers: [YearPensumController],
  providers: [YearPensumService],
  exports: [TypeOrmModule]
})
export class YearPensumModule {}
