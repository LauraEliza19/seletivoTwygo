//backend\src\entity\course.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  startDate!: string;

  @Column()
  endDate!: string;

  @Column('simple-array', { nullable: true })
  videos!: string[];  // Coluna que armazena as URLs dos vídeos
}
