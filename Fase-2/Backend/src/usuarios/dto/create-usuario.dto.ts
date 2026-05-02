import { IsArray, IsEmail, IsInt, IsOptional, IsString } from "class-validator";
import { Carrera } from "src/carreras/entities/carrera.entity";

export class CreateUsuarioDto {

        @IsString()
        nombre: string;
    
        @IsString()
        apellidos: string;

        @IsEmail()
        correo: string;
    
        @IsString()
        password: string;

        @IsString()
        @IsOptional()
        description?: string;

        @IsArray()
        @IsInt({ each: true })
        @IsOptional()
        carreras: Carrera[];
}
