import { Pensum } from "src/pensum/entities/pensum.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class YearPensum {
    @Column({ primary: true, generated: true })
    id: number;

    //volver a true si se borra la base
    @Column({unique: true, type: 'year'})
    year: number; 

      @OneToMany(() => Pensum, (p) => p.yearPensum)
  pensums: Pensum[];

    @DeleteDateColumn()
    deletedAt: Date;
}
