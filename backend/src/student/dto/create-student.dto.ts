import { IsString, IsEmail, IsDate, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { DateValidation } from '../utils/dateValidation';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  country: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @DateValidation(new Date('2000-01-01'), new Date('2010-12-31'), {
    message: 'Date of birth must be between 2000-01-01 and 2010-12-31',
  })
  dateOfBirth: Date;
}
