import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm";
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

    @Column({ select: false, default: false })
    confirmedEmail: boolean;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

}