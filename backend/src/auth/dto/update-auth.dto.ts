import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './SignUp.dto';

export class UpdateAuthDto extends PartialType(SignUpDto) { }
