import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';

@UseGuards(AuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  getStudents() {
    return this.studentsService.getStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: number) {
    return this.studentsService.getStudentById(id);
  }

  @Post()
  createStudent(@Body() studentData: CreateStudentDto) {
    return this.studentsService.createStudent(studentData);
  }

  @Put(':id')
  updateStudent(
    @Param('id') id: number,
    @Body() studentData: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(id, studentData);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentsService.deleteStudent(id);
  }
}
