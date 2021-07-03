import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";
import { Location } from "./Location";


@Entity('businesses')
export class Business extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    businessName: string;
    
    @Column({ nullable: true })
    nameFantasy: string;

    @Column({ unique: true })
    rut:string;

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

    @OneToOne(() => Department)
    @JoinColumn()
    departament: Department;

    @OneToOne(() => Location)
    @JoinColumn()
    location: Location;

    @Column({ nullable: true })
    affiliationDate: Date;
   
    @Column({ nullable: true })
    initDate: Date;
   
    @Column({ nullable: true })
    state: boolean;

    @Column({ nullable: true })
    leaveDate: Date;

    @Column({ nullable: true })
    observations: string;

    @Column({ nullable: true })
    logo: string;
}