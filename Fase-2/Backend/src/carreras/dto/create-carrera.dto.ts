import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateCarreraDto {

    @IsString()
    @MinLength(5)
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}
