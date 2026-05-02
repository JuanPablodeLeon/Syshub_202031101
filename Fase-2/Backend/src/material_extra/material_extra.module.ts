import { Module } from '@nestjs/common';
import { MaterialExtraService } from './material_extra.service';
import { MaterialExtraController } from './material_extra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialExtra } from './entities/material_extra.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialExtra]), UsuariosModule],
  controllers: [MaterialExtraController],
  providers: [MaterialExtraService, UsuariosService],
  exports:[TypeOrmModule]
})
export class MaterialExtraModule {}
