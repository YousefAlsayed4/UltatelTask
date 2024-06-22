import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsOptional } from 'class-validator';
import { Gender } from './create-student.dto';
import { DateValidation } from '../utils/dateValidation';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  gender?: Gender;

  @IsOptional()
  country?: string;

  @IsOptional()
  @DateValidation(new Date('2000-01-01'), new Date('2010-12-31'), {
    message: 'Date of birth must be between 2000-01-01 and 2010-12-31',
  })
  dateOfBirth?: Date;
}
