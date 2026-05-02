import { ArrayUnique, IsArray, IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreatePublicacionesForoDto {
  @IsString()
  @MaxLength(300)
  titulo: string;

  @IsString()
  @MaxLength(2500)
  descripcion: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @ArrayUnique()
  etiquetaIds?: number[];
}
