import { Module } from '@nestjs/common';
import { PensumService } from './pensum.service';
import { PensumController } from './pensum.controller';
import { Pensum } from './entities/pensum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pensum])],
  controllers: [PensumController],
  providers: [PensumService],
})
export class PensumModule {}
