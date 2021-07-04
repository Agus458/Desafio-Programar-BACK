import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Business } from "./Business";
import { Person } from "./Person";

@Entity('businesses-persons')
export class Business_Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Person, person => person.bussinesses)
    person: Person;

    @ManyToOne(() => Business, bussiness => bussiness.persons)
    bussiness: Business;

    @Column()
    tipo: string;

}