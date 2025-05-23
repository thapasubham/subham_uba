import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar", { length: 20 })
  name: string;

  @Column("boolean", { default: false })
  isDeleted?: boolean;
}
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar", { length: 20, nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permission?: Permission[];
}
