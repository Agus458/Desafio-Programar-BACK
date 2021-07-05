import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Business } from "./Business";
import { Role } from "./Role";

/* ----- User Model ----- */

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

    @OneToOne(() => Business, business => business.user)
    @JoinColumn()
    business: Business;
}