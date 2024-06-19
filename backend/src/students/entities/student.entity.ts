// student.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { calculateAge } from '../utils/calculate-age'; // Import utility function

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column()
  country: string;

  @Column()
  dateOfBirth: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  setAgeBeforeInsert(): void {
    this.age = calculateAge(this.dateOfBirth);
  }
  @BeforeUpdate()
  setAgeBeforeUpdate(): void {
    this.age = calculateAge(this.dateOfBirth);
  }
}
