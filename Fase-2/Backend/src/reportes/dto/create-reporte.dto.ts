import { IsIn, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateReporteDto {
    @IsIn(['foro', 'blog'])
    tipo: 'foro' | 'blog';

    @IsInt()
    referenciaId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    motivo: string;
}
