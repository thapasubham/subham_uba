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

  @ManyToOne(() => InternshipDetail)
  intern: InternshipDetail;
}

@Entity()
export class InternshipDetail {
  @PrimaryGeneratedColumn("increment")
  intern_id: number;

  @Column("varchar", { nullable: false })
  name: string;

  @Column("varchar", { nullable: false })
  mentorName: string;

  @Column("date", { nullable: false })
  startDate: Date;

  @Column("date", { nullable: false })
  endDate?: Date;

  @Column("bit", { nullable: false, default: false })
  isCertified?: boolean;

  constructor() {
    if (!this.endDate && this.startDate) {
      const newDate = new Date(this.startDate);
      newDate.setDate(newDate.getMonth() + 3);
      this.endDate = newDate;
    }
  }
}
