import { ClasesGrabada } from "src/clases_grabadas/entities/clases_grabada.entity";
import { MaterialExtra } from "src/material_extra/entities/material_extra.entity";
import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";

@Entity()
export class PublicacionesCurso {
    @Column({ primary: true, generated: true })
    id: number;

  @OneToOne(() => Proyecto, { nullable: true })
  @JoinColumn({ name: 'destacado_id' })
  destacado: Proyecto | null;

  @ManyToMany(() => Proyecto)
  @JoinTable({
    name: 'publicacion_proyectos',
    joinColumn:        { name: 'publicacion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'proyecto_id',    referencedColumnName: 'id' },
  })
  proyectos: Proyecto[];

  @ManyToMany(() => ClasesGrabada)
  @JoinTable({
    name: 'publicacion_clases',
    joinColumn:        { name: 'publicacion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'clase_id',        referencedColumnName: 'id' },
  })
  clasesGrabadas: ClasesGrabada[];

  @ManyToMany(() => MaterialExtra)
  @JoinTable({
    name: 'publicacion_material',
    joinColumn:        { name: 'publicacion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'material_id',    referencedColumnName: 'id' },
  })
  materialesExtra: MaterialExtra[];
}
