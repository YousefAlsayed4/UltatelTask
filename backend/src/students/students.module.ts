import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { AuthModule } from '../auth/auth.module'; // Ensure the correct path

@Module({
  imports: [TypeOrmModule.forFeature([Student]), AuthModule], // Import AuthModule here
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
