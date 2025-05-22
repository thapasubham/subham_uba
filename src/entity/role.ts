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
  id: number;

  @Column("varchar", { length: 20 })
  name: string;
}
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20, nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Permission)
  permission: Permission;
}
