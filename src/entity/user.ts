import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Role} from "./role";



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
}

@Entity()
export class user extends Details {
  @ManyToOne(() => Role)
  role: Role;
}

@Entity()
export class Mentor extends Details {
  @ManyToOne(() => Role)
  role: Role;
}


