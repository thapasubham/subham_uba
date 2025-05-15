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
export class user {
  @PrimaryColumn("bigint", { nullable: false })
  id: number;

  @Column("varchar", { nullable: false })
  firstname: string;

  @Column("varchar", { nullable: false })
  lastname: string;

  @Column("varchar", { nullable: false })
  email: string;

  @Column("varchar", { length: 10, nullable: false })
  phoneNumber: string;

  @Column("bit", { default: false })
  isDeleted?: boolean;

  @ManyToOne(() => Intern, (Intern) => Intern.name)
  intern: Intern;
}

@Entity()
export class Intern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: String;
}
