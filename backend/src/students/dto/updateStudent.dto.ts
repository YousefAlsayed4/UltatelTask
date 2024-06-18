import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateStudentDto {
  // Assuming typical student fields, adjust as necessary
  @IsString()
  @IsNotEmpty()
  firstName?: string;
  @IsString()
  @IsNotEmpty()
  lastName?: string;
  @IsNotEmpty()
  @IsNumber()
  age?: number;
  @IsNotEmpty()
  @IsNumber()
  grade?: number;
}
