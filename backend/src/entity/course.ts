import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;
}
