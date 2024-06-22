import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { calculateAge } from '../utils/calculateDate';
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column()
  country: string;

  @Column()
  dateOfBirth: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateAge() {
    this.age = calculateAge(this.dateOfBirth);
  }
}
