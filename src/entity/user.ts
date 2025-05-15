import {
  Column,
  Entity,
  In,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
export class Details {
  @PrimaryColumn("bigint", { nullable: false })
  id: number;

  @Column("varchar", { nullable: false })
  firstname: string;

  @Column("varchar", { nullable: false })
  lastname: string;

  @Column("varchar", { nullable: false, unique: true })
  email: string;

  @Column("varchar", { length: 10, nullable: false, unique: true })
  phoneNumber: string;

  @Column("boolean", { default: false })
  isDeleted?: boolean;
}

@Entity()
export class user extends Details {
  @ManyToOne(() => Intern, (Intern) => Intern.name)
  intern: Intern;
}

@Entity()
export class Mentors extends Details {
  @Column("varchar", { nullable: false })
  role: string;
}
@Entity()
export class Intern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true, nullable: false })
  name: String;

  @Column("boolean", { default: false })
  isDeleted?: boolean;
}
