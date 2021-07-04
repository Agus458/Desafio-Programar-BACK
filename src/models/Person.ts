import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Business_Person } from "./Business_Person";

/* ----- Person Model ----- */

@Entity("persons")
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Business_Person, business_person => business_person.person, { cascade: true })
    bussinesses: Business_Person[];
}
