import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateRespuestaDto {
    @IsString()
    @MaxLength(2000)
    descripcion: string;


    @IsOptional()
    @IsInt()
    @Min(1)
    padreId?: number;
}
