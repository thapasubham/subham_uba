import {
  Column,
  Entity,
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

  @Column("varchar", { nullable: false })
  phoneNumber: string;

  @Column("bit", { default: false })
  isDeleted?: boolean;
}
