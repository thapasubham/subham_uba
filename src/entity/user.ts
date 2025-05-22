import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcrypt";
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20, nullable: false, unique: true })
  name: string;
}

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

@Entity()
export class Intern {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar", { unique: true, nullable: false })
  name: String;

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

  @OneToOne(() => user)
  @JoinColumn({ name: "userId" })
  user: user;
}
