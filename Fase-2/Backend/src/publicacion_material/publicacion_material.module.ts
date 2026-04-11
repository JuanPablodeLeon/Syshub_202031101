import { Module } from '@nestjs/common';
import { PublicacionMaterialService } from './publicacion_material.service';
import { PublicacionMaterialController } from './publicacion_material.controller';
import { PublicacionMaterial } from './entities/publicacion_material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacionMaterial])],
  controllers: [PublicacionMaterialController],
  providers: [PublicacionMaterialService],
})
export class PublicacionMaterialModule {}
