import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Role } from "./role.js";
import { PasswordHasher } from "../app/web/auth/hash.js";

@Entity()
export class Details {
  @Index()
  @PrimaryColumn("bigint", { nullable: false })
  id?: number;

  @Column("varchar", { length: 30, nullable: false })
  firstname: string;

  @Column("varchar", { length: 30, nullable: false })
  lastname: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await PasswordHasher.Hash(this.password);
  }
}

@Entity()
export class User extends Details {}

@Entity()
export class Mentor extends Details {}
