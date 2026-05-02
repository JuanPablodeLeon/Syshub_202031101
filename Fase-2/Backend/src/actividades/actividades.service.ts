
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { Actividade } from './entities/actividade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ActividadesService {

  constructor(
    @InjectRepository(Actividade)
    private readonly actividadeRepository: Repository<Actividade>,
  
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}
  async registrar(
    correoUsuario: string,
    tipoAccion: string,
    referenciaId?: number,
    detalle?: string,
  ): Promise<Actividade> {
    const usuario = await this.usuarioRepository.findOneBy({ correo: correoUsuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const actividad = this.actividadeRepository.create({
      usuario,
      tipoAccion,
      referenciaId: referenciaId ?? null,
      detalle: detalle ?? null,
    });

    return this.actividadeRepository.save(actividad);
  }

  async findByUsuario(usuarioId: number): Promise<Actividade[]> {
    const user = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return this.actividadeRepository.find({
      where: { usuario: { id: usuarioId } },
      order: { creadoEn: 'DESC' },
    });
  }

  async findAll(): Promise<Actividade[]> {
    return this.actividadeRepository.find({
      relations: ['usuario'],
      order: { creadoEn: 'DESC' },
    });
  }
}
