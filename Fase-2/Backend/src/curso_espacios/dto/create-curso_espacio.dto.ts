import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateCursoEspacioDto {
    @IsInt()
    cursoDisponibleId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    seccion: string;

    @IsInt()
    catedraticoId: number;

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    auxiliarIds?: number[];

    @IsInt()
    @Min(1)
    @Max(2)
    semestre: number;

    @IsInt()
    @Min(2000)
    year: number;
}
