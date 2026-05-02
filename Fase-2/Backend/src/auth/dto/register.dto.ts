import { Transform, Type } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    nombre: string;

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    apellidos: string;

    @IsEmail()
    correo: string;

    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    password: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    @IsOptional()
    carrerasIds: number[];
}