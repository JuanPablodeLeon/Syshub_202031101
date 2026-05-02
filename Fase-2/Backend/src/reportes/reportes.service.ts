import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reporte } from './entities/reporte.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(correoUsuario: string, dto: CreateReporteDto): Promise<Reporte> {
    const usuario = await this.usuarioRepository.findOneBy({ correo: correoUsuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const reporte = this.reporteRepository.create({
      tipo: dto.tipo,
      referenciaId: dto.referenciaId,
      motivo: dto.motivo,
      estado: 'pendiente',
      reportadoPor: usuario,
    });

    return this.reporteRepository.save(reporte);
  }

  async findAll(): Promise<Reporte[]> {
    return this.reporteRepository.find({
      order: { creadoEn: 'DESC' },
    });
  }

  async updateEstado(id: number, estado: 'revisado' | 'descartado'): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOneBy({ id });
    if (!reporte) throw new NotFoundException(`Reporte #${id} no encontrado`);
    reporte.estado = estado;

    return this.reporteRepository.save(reporte);
  }
}
