import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { Carrera } from 'src/carreras/entities/carrera.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsuariosService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {

        const user = await this.userService.findOneByEmail(registerDto.correo);
        if(user){
            throw new BadRequestException('El correo ya está registrado');
        }

        const carreras = registerDto.carrerasIds
        ? registerDto.carrerasIds.map(id => ({ id } as Carrera))
        : [];
        
        return await this.userService.create({
            nombre: registerDto.nombre,
            apellidos: registerDto.apellidos,
            correo: registerDto.correo,
            password: await bcryptjs.hash(registerDto.password, 12),
            description: registerDto.description,
            carreras,
        });
    }

    async login(loginDto: LoginDto) {

        const user = await this.userService.findOneByEmail(loginDto.correo);
        if(!user){
            throw new BadRequestException('Correo no valido');
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password, user.password);
        if(!isPasswordValid){
            throw new BadRequestException('Contraseña incorrecta');
        }

        if(user.estadoPerfil?.nombre === 'suspendido'){
            throw new UnauthorizedException('Tu cuenta se encuentra suspendida por incumplir normas');
        }

        if(user.estadoPerfil?.nombre === 'inactivo'){
            throw new UnauthorizedException('Tu cuenta se encuentra Inactiva. Contacta con un Administrador para reactivarla');
        }

        const payload = { correo: user.correo };
        const token = await this.jwtService.signAsync(payload);
        return {
            token: token,
            correo: user.correo
        };
    }

}
