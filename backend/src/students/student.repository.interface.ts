import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';

export interface IStudentRepository {
  findAll(): Promise<Student[]>;
  findById(id: number): Promise<Student>;
  create(studentData: CreateStudentDto): Promise<Student>;
  update(id: number, studentData: UpdateStudentDto): Promise<Student>;
  delete(id: number): Promise<void>;
}
