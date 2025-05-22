import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Software {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: String;

    @Column('text')
    description!: String;

    @Column('simple-array')
  accessLevels!: string[];

}