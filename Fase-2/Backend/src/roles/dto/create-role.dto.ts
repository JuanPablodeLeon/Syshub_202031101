import { IsEnum, IsOptional, IsSemVer, IsString, Max, MaxLength } from "class-validator";
import { Rol } from "src/common/enums/rol.enum";

export class CreateRoleDto {
    
    @IsEnum(Rol, 
        { 
            message: 'El nombre del rol debe ser uno de los siguientes: admin, estudiante, auxiliar, catedratico, investigador'
     })
    nombre: Rol;

    @IsOptional()
    @IsString()
    @MaxLength(255, { message: 'La descripción no puede tener más de 255 caracteres' })
    descripcion?: string;
}
