import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { In, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { EstadoPerfil } from 'src/estado_perfil/entities/estado_perfil.entity';
import { Actividade } from 'src/actividades/entities/actividade.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Actividade)
    private readonly actividadRepository: Repository<Actividade>
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuariosRepository.create({
      ...createUsuarioDto,
      rol: { id: 2 },           // por defecto: estudiante
      estadoPerfil: { id: 1 },  // por defecto: activo
    });
    return await this.usuariosRepository.save(user);
  }

  async findAll() {
    return await this.usuariosRepository.find({
      relations: ['rol', 'estadoPerfil'],
    });
  }

  async findOne(id: number) {
    const user = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['rol', 'estadoPerfil', 'carreras'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findByRol(rolNombre: string): Promise<Usuario[]> {
    return this.usuariosRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.rol', 'rol')
      .leftJoinAndSelect('u.estadoPerfil', 'ep')
      .where('rol.nombre = :rolNombre', { rolNombre })
      .orderBy('u.nombre', 'ASC')
      .getMany();
  }

  /**
   * Actualiza campos generales. Para cambiar rol o estado desde el admin
   * se acepta rolId y estadoPerfilId en el body.
   */
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.usuariosRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { rolId, estadoPerfilId, ...rest } = updateUsuarioDto as any;

    if (rolId !== undefined) {
      (rest as any).rol = { id: rolId };
    }
    if (estadoPerfilId !== undefined) {
      (rest as any).estadoPerfil = { id: estadoPerfilId };
    }

    await this.usuariosRepository.save({ ...user, ...rest });
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.usuariosRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return await this.usuariosRepository.softDelete(id);
  }

  async findOneByEmail(correo: string) {
    return await this.usuariosRepository.findOne({
      where: { correo },
      relations: ['rol', 'estadoPerfil', 'carreras'],
    });
  }

  async findActividades(id: number) {
    const user = await this.usuariosRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.actividadRepository.find({
      where: { usuario: { id } },
      order: { creadoEn: 'DESC' },
    });
  }
}
