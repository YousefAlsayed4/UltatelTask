import {
  IsString,
  IsInt,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;
}
