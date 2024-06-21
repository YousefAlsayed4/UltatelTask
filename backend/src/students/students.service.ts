// // students.service.ts
// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Student } from './entities/student.entity';
// import { CreateStudentDto } from './dto/student.dto';
// import { UpdateStudentDto } from './dto/updateStudent.dto';
// import { calculateAge } from './utils/calculate-age';

// @Injectable()
// export class StudentsService {
//   constructor(
//     @InjectRepository(Student)
//     private studentsRepository: Repository<Student>,
//   ) {}

//   async getStudents(): Promise<Student[]> {
//     const students = await this.studentsRepository.find();
//     // Calculate age for each student
//     students.forEach((student) => {
//       student.age = calculateAge(student.dateOfBirth);
//     });
//     return students;
//   }

//   async getStudentById(id: number): Promise<Student> {
//     const student = await this.studentsRepository.findOne({ where: { id } });
//     if (!student) {
//       throw new NotFoundException(`Student with ID ${id} not found`);
//     }
//     // Calculate age for the student
//     student.age = calculateAge(student.dateOfBirth);
//     return student;
//   }

//   async createStudent(studentData: CreateStudentDto): Promise<Student> {
//     // Validate and parse dateOfBirth
//     const dateOfBirth = studentData.dateOfBirth;
//     if (!dateOfBirth || isNaN(dateOfBirth.getTime())) {
//       throw new BadRequestException(
//         'dateOfBirth must be a valid ISO 8601 date string',
//       );
//     }

//     // Calculate age
//     const age = calculateAge(dateOfBirth);

//     // Create student entity
//     const newStudent = this.studentsRepository.create({
//       ...studentData,
//       age, // Assign calculated age
//     });

//     // Save to database
//     await this.studentsRepository.save(newStudent);

//     return newStudent;
//   }
//   async updateStudent(
//     id: number,
//     studentData: UpdateStudentDto,
//   ): Promise<Student> {
//     const student = await this.getStudentById(id);
//     this.studentsRepository.merge(student, studentData);
//     const updatedStudent = await this.studentsRepository.save(student);
//     updatedStudent.age = calculateAge(updatedStudent.dateOfBirth);
//     return updatedStudent;
//   }

//   async deleteStudent(id: number): Promise<string> {
//     const result = await this.studentsRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Student with ID ${id} not found`);
//     }
//     return 'User deleted successfully';
//   }
// }

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { calculateAge } from './utils/calculate-age';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: number): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async createStudent(studentData: CreateStudentDto): Promise<Student> {
    // Validate and parse dateOfBirth
    const dateOfBirth = studentData.dateOfBirth;
    if (!dateOfBirth || isNaN(dateOfBirth.getTime())) {
      throw new BadRequestException(
        'dateOfBirth must be a valid ISO 8601 date string',
      );
    }

    // Calculate age
    const age = calculateAge(dateOfBirth);

    // Create student entity
    const newStudent = this.studentRepository.create({
      ...studentData,
      age, // Assign calculated age
    });

    // Save to database
    await this.studentRepository.save(newStudent);

    return newStudent;
  }

  async updateStudent(
    id: number,
    studentData: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.getStudentById(id);
    this.studentRepository.merge(student, studentData);
    const updatedStudent = await this.studentRepository.save(student);
    updatedStudent.age = calculateAge(updatedStudent.dateOfBirth);
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<{ message: string }> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }

  async filterStudents(
    currentPage: number,
    pageSize: number,
    searchParams: any,
  ): Promise<{ data: Student[]; total: number }> {
    const queryBuilder = this.studentRepository.createQueryBuilder('student');

    // Apply search parameters
    if (searchParams.name) {
      queryBuilder.andWhere('student.name LIKE :name', {
        name: `%${searchParams.name}%`,
      });
    }
    if (searchParams.email) {
      queryBuilder.andWhere('student.email LIKE :email', {
        email: `%${searchParams.email}%`,
      });
    }
    if (searchParams.gender) {
      queryBuilder.andWhere('student.gender = :gender', {
        gender: searchParams.gender,
      });
    }
    if (searchParams.country) {
      queryBuilder.andWhere('student.country = :country', {
        country: searchParams.country,
      });
    }

    // Apply pagination
    const total = await queryBuilder.getCount();
    queryBuilder.skip((currentPage - 1) * pageSize).take(pageSize);

    const data = await queryBuilder.getMany();

    return { data, total };
  }
}
