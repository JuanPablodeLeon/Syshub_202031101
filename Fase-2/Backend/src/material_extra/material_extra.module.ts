import { Module } from '@nestjs/common';
import { MaterialExtraService } from './material_extra.service';
import { MaterialExtraController } from './material_extra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialExtra } from './entities/material_extra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialExtra])],
  controllers: [MaterialExtraController],
  providers: [MaterialExtraService],
})
export class MaterialExtraModule {}
