import {Column, PrimaryGeneratedColumn} from "typeorm";

export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, nullable: false, unique: true })
    name: string;
}