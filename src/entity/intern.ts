import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Mentor, User } from "./user.js";

@Entity()
export class Intern {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar", { unique: true, nullable: false })
  name: string;

  @Column("boolean", { default: false })
  isDeleted?: boolean;
}

@Entity()
export class internShipDetails {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("date")
  started_at: Date;

  @Column("date")
  end_at: Date;

  @Column("boolean")
  isCertified: boolean;

  @ManyToOne(() => Intern)
  intern: Intern;

  @ManyToOne(() => Mentor)
  mentor: Mentor;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;
}
