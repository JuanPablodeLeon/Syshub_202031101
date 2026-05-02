import { Injectable } from '@nestjs/common';
import { CreateClasesGrabadaDto } from './dto/create-clases_grabada.dto';
import { UpdateClasesGrabadaDto } from './dto/update-clases_grabada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClasesGrabada } from './entities/clases_grabada.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ClasesGrabadasService {
  constructor(
    @InjectRepository(ClasesGrabada)
    private readonly clasesGrabadaRepository: Repository<ClasesGrabada>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}
  create(createClasesGrabadaDto: CreateClasesGrabadaDto) {
    return 'This action adds a new clasesGrabada';
  }

  findAll() {
    return `This action returns all clasesGrabadas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clasesGrabada`;
  }

  update(id: number, updateClasesGrabadaDto: UpdateClasesGrabadaDto) {
    return `This action updates a #${id} clasesGrabada`;
  }

  remove(id: number) {
    return `This action removes a #${id} clasesGrabada`;
  }
}
