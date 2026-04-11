import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class ArchivosProyecto {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
  proyecto_id: string;

  @Column()
  nombre: string;

  @Column()
  url: string;

  @Column({nullable: true })
  tipoMime: string;

  @Column({ nullable: true })
  tamanoBytes: number;


  @CreateDateColumn({ name: 'subido_en', type: 'datetime' })
  subidoEn: Date;
}
