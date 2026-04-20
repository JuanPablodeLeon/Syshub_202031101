import { IsEnum } from "class-validator";
import { Estado } from "src/common/enums/estado.enum";

export class CreateEstadoPerfilDto {
    @IsEnum(Estado, 
        { 
            message: 'El nombre del estado de perfil debe ser uno de los siguientes: activo, inactivo, suspendido, eliminado'
     })
    nombre: Estado;
}
