import {
  IsString,
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateInRange } from './isDateInRange.decorator';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the student' })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the student',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Male',
    enum: Gender,
    description: 'The gender of the student',
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ example: 'USA', description: 'The country of the student' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: '2005-06-15',
    description: 'The birth date of the student',
    type: String,
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @IsDateInRange(new Date('2000-01-01'), new Date('2010-12-31'), {
    message: 'Date of birth must be between 2000-01-01 and 2010-12-31',
  })
  dateOfBirth: Date;
}
