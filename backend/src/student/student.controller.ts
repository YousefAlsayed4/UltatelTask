import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { AuthGuard } from '../guard/auth.guard';

@ApiTags('Student')
@Controller('student')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({
    status: 201,
    description: 'The student has been successfully created.',
    type: Student,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({
    status: 200,
    description: 'List of all students',
    type: [Student],
  })
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiResponse({
    status: 200,
    description: 'The student with the given ID',
    type: Student,
  })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async findOne(@Param('id') id: string): Promise<Student> {
    const student = await this.studentService.findOne(+id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated student',
    type: Student,
  })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const updatedStudent = await this.studentService.update(
      +id,
      updateStudentDto,
    );
    if (!updatedStudent) throw new NotFoundException('Student not found');
    return updatedStudent;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.studentService.remove(+id);
    if (!success) throw new NotFoundException('Student not found');
    return { success };
  }

  @Post('multiple')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create multiple students' })
  @ApiResponse({
    status: 201,
    description: 'The students have been successfully created.',
    type: Student,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createMultiple(
    @Body() createStudentDtos: CreateStudentDto[],
  ): Promise<Student[]> {
    return await this.studentService.createMultiple(createStudentDtos);
  }
}
