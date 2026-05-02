import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Respuesta } from './entities/respuesta.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) { }
  async create(
    correoUsuario: string,
    dto: CreateRespuestaDto,
  ): Promise<Respuesta> {
    const creador = await this.usuarioRepository.findOneBy({
      correo: correoUsuario,
    });
    if (!creador) throw new NotFoundException('Usuario no encontrado');

    const respuesta = this.respuestaRepository.create({
      descripcion: dto.descripcion,
      creador,
    });

    if (dto.padreId) {
      const padre = await this.respuestaRepository.findOneBy({
        id: dto.padreId,
      });
      if (!padre)
        throw new NotFoundException(`Respuesta padre #${dto.padreId} no existe`);
      respuesta.padre = padre;
    }

    return this.respuestaRepository.save(respuesta);
  }


  findAll() {
    return `This action returns all respuestas`;
  }

  async findOne(id: number): Promise<Respuesta> {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id },
      relations: ['creador', 'subRespuestas', 'subRespuestas.creador'],
    });
    if (!respuesta)
      throw new NotFoundException(`Respuesta #${id} no encontrada`);
    return respuesta;
  }

  // ── Votar (solo usuarios logueados) ─────────────────────────
  async votar(id: number, valor: 1 | -1): Promise<Respuesta> {
    const respuesta = await this.respuestaRepository.findOneBy({ id });
    if (!respuesta)
      throw new NotFoundException(`Respuesta #${id} no encontrada`);

    respuesta.cantValoracion += valor;
    return this.respuestaRepository.save(respuesta);
  }

 async update(
    id: number,
    correoUsuario: string,
    dto: UpdateRespuestaDto,
  ): Promise<Respuesta> {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id },
      relations: ['creador'],
    });
    if (!respuesta)
      throw new NotFoundException(`Respuesta #${id} no encontrada`);
    if (respuesta.creador.correo !== correoUsuario)
      throw new ForbiddenException('Solo el creador puede editar esta respuesta');

    Object.assign(respuesta, dto);
    return this.respuestaRepository.save(respuesta);
  }

  // ── Eliminar (solo el creador) ───────────────────────────────
  async remove(id: number, correoUsuario: string): Promise<void> {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id },
      relations: ['creador'],
    });
    if (!respuesta)
      throw new NotFoundException(`Respuesta #${id} no encontrada`);
    if (respuesta.creador.correo !== correoUsuario)
      throw new ForbiddenException(
        'Solo el creador puede eliminar esta respuesta',
      );

    await this.respuestaRepository.remove(respuesta);
  }
}
