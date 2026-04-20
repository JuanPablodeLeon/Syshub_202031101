import { Clasificacion } from "src/common/enums/clasificacion.enum";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ClasesGrabada {
    
    @Column({ primary: true, generated: true})
    id: number;

  @ManyToOne(() => Usuario, (u) => u.clasesGrabadas)
  @JoinColumn({ name: 'id_creador' })
  creador: Usuario;

  @Column()
  nombre: string;

  @Column()
  fecha: Date;

  @Column()
  enlace: string;

  @Column({type: 'enum', enum: Clasificacion})
  clasificacion: string;
}
