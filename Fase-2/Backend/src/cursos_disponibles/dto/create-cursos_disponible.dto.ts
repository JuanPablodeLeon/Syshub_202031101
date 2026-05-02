import { IsNotEmpty, MaxLength, IsInt, IsOptional, IsString, Min, IsBoolean } from "class-validator";
export class CreateCursosDisponibleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    codigo: string;

    @IsInt()
    @Min(1)
    creditos: number;

    @IsBoolean()
    @IsOptional()
    obligatorio?: boolean;

    @IsBoolean()
    @IsOptional()
    clar?: boolean;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsInt()
    carreraId: number;
}
