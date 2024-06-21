// student.dto.ts
export interface Student {
  _id: number;
  first_name: string;
  last_name: string;
  name:string;
  dob: Date;
  gender: string;
  email: string;
  country: string;
}

// studentFilter.dto.ts
export interface StudentFilter extends Student {
  age: number;
}

// studentPaginated.dto.ts

