import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Role } from "./role.js";

@Entity()
export class Details {
  @Index()
  @PrimaryColumn("bigint", { nullable: false })
  id: number;

  @Column("varchar", { length: 30, nullable: false })
  firstname: string;

  @Column("varchar", { length: 30, nullable: false })
  lastname: string;

  @Index("email-idx")
  @Column("varchar", { length: 30, nullable: false, unique: true })
  email: string;

  @Column("varchar")
  password?: string;

  @Column("varchar", { length: 10, nullable: false, unique: true })
  phoneNumber: string;

  @Column("boolean", { default: false })
  isDeleted?: boolean;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role: Role;
}

@Entity()
export class User extends Details {}

@Entity()
export class Mentor extends Details {}
