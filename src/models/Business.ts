import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Business_Person } from "./Business_Person";
import { Department } from "./Department";
import { Location } from "./Location";
import { User } from "./User";


@Entity('businesses')
export class Business extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    businessName: string;

    @Column({ nullable: true })
    nameFantasy: string;

    @Column({ unique: true })
    rut: string;

    @Column({ nullable: true })
    address: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    cellphone: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    BPS: string;

    @Column({ nullable: true })
    occupation: string;

    /*
    Nro Referencia (opcional), Rubro de Actividad Secundaria (opcional),
    */

    @ManyToOne(() => Department)
    department: Department;

    @ManyToOne(() => Location)
    location: Location;

    @CreateDateColumn()
    affiliationDate: Date;

    @Column({ nullable: true })
    initDate: Date;

    @Column({ nullable: true, default: true})
    state: boolean;

    @Column({ nullable: true })
    leaveDate: Date;

    @Column({ nullable: true })
    observations: string;

    @Column({ nullable: true })
    logo: string;

    @OneToMany(() => Business_Person, business_person => business_person.bussiness)
    persons: Business_Person[]

    @OneToOne(() => User, user => user.business)
    user: User;
    
}