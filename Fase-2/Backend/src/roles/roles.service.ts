import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
constructor(
  @InjectRepository(Role)
  private roleRepository: Repository<Role>,
) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findOneBy({ nombre: createRoleDto.nombre });
    if(role) {
      throw new BadRequestException('El rol ya existe');
    }
    const roleSave = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(roleSave);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
  const entity = await this.roleRepository.findOneBy({ id });
  if (!entity) throw new NotFoundException(`Rol no existente`);
  return entity;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOneBy({ id });
    if(!role){
      throw new BadRequestException('El rol no existe');
    }
    return await this.roleRepository.update(id, updateRoleDto);
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOneBy({ id });
    if(!role){
      throw new BadRequestException('El rol no existe');
    }
    return await this.roleRepository.softDelete(id);
  }
}
