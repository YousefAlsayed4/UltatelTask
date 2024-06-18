import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return await this.studentsRepository.find();
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async createStudent(studentData: CreateStudentDto): Promise<Student> {
    const newStudent = this.studentsRepository.create(studentData);
    await this.studentsRepository.save(newStudent);
    return newStudent;
  }

  async updateStudent(
    id: number,
    studentData: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.getStudentById(id);
    this.studentsRepository.merge(student, studentData);
    return this.studentsRepository.save(student);
  }

  async deleteStudent(id: number): Promise<string> {
    const result = await this.studentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return 'user deleted succesfully';
  }
}
