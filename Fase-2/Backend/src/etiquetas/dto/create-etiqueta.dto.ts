import { IsAlpha, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateEtiquetaDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(70)
    nombre: string;
}
