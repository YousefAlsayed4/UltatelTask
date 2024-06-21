import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from './create-student.dto';
import { IsDateInRange } from './isDateInRange.decorator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the student',
  })
  @IsOptional()
  name?: string;


  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'The email of the student',
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: 'Male',
    enum: Gender,
    description: 'The gender of the student',
  })
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({
    example: 'USA',
    description: 'The country of the student',
  })
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    example: '2005-06-15',
    description: 'The birth date of the student',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateInRange(new Date('2000-01-01'), new Date('2010-12-31'), {
    message: 'Date of birth must be between 2000-01-01 and 2010-12-31',
  })
  dateOfBirth?: Date;
}
