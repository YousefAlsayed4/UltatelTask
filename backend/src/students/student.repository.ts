// student.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { IStudentRepository } from './student.repository.interface';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.studentsRepository.find();
  }

  async findById(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async create(studentData: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentsRepository.create(studentData);
    await this.studentsRepository.save(newStudent);
    return newStudent;
  }

  async update(id: number, studentData: UpdateStudentDto): Promise<Student> {
    const student = await this.findById(id);
    this.studentsRepository.merge(student, studentData);
    return this.studentsRepository.save(student);
  }

  async delete(id: number): Promise<void> {
    const result = await this.studentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
