import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.create(createStudentDto);
    return await this.save(student);
  }

  async updateStudent(id: number, updateStudentDto: UpdateStudentDto): Promise<Student | null> {
    await this.update(id, updateStudentDto);
    return this.findOneBy({id});
  }
  
  async deleteStudent(id: number): Promise<boolean> {
    const result = await this.delete(id);
    return result.affected > 0;
  }
}
