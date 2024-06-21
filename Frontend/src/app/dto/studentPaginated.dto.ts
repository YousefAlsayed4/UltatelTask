import { Student } from "./student.dto";
export interface StudentPaginated {
  data: Student[];
  total: number;
}