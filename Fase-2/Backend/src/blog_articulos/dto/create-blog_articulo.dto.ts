import { ArrayUnique, IsArray, IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateBlogArticuloDto {
    @IsString()
    @MaxLength(300)
    titulo: string;

    @IsString()
    @MaxLength(10000)
    descripcion: string;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    @ArrayUnique()
    etiquetaIds?: number[];
}
