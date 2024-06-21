import { Injectable, ConflictException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  private calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const age = this.calculateAge(createStudentDto.dateOfBirth);
    const student = this.studentRepository.create({
      ...createStudentDto,
      age: age,
    });
    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email is already taken');
      }
      throw error;
    }
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(id: number): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | null> {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) throw new ConflictException('Student not found');

    const updatedStudent = {
      ...student,
      ...updateStudentDto,
      age: updateStudentDto.dateOfBirth
        ? this.calculateAge(updateStudentDto.dateOfBirth)
        : student.age,
    };

    try {
      await this.studentRepository.update(id, updatedStudent);
      return await this.studentRepository.findOneBy({ id });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email is already taken');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<boolean> {
    return await this.studentRepository.deleteStudent(id);
  }

  async createMultiple(
    createStudentDtos: CreateStudentDto[],
  ): Promise<Student[]> {
    const createdStudents: Student[] = [];

    for (const createStudentDto of createStudentDtos) {
      const age = this.calculateAge(createStudentDto.dateOfBirth);
      const student = this.studentRepository.create({
        ...createStudentDto,
        age: age,
      });

      try {
        const savedStudent = await this.studentRepository.save(student);
        createdStudents.push(savedStudent);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('Email is already taken');
        }
        throw error;
      }
    }

    return createdStudents;
  }
}
