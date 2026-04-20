import { ArchivosProyecto } from "src/archivos_proyecto/entities/archivos_proyecto.entity";
import { Etiqueta } from "src/etiquetas/entities/etiqueta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Collection, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Proyecto {

    @Column({ primary: true, generated: true })
    id: number;

    @ManyToOne(() => Usuario, (u) => u.proyectos)
  @JoinColumn({ name: 'id_creador' })
  creador: Usuario; // solo Estudiantes — validado en backend

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  stack: string | null; // JSON o separado por comas

  @CreateDateColumn({ name: 'fecha_publicado', type: 'datetime' })
  fechaPublicado: Date;

  @OneToMany(() => ArchivosProyecto, (a) => a.proyecto, { cascade: true })
  archivos: ArchivosProyecto[];

  @ManyToMany(() => Etiqueta, (e) => e.proyectos)
  @JoinTable({
    name: 'proyecto_etiquetas',
    joinColumn:        { name: 'proyecto_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'etiqueta_id', referencedColumnName: 'id' },
  })
  etiquetas: Etiqueta[];

}
