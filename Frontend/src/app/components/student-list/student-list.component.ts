import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { StudentAddComponent } from '../student-add/student-add.component';
// import { StudentEditComponent } from '../student-edit/student-edit.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Student } from '../../dto/student.dto';
import { StudentFilter } from '../../dto/studentFilter.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditStudentComponent } from '../student-edit/student-edit.component'
import { StudentPaginated } from '../../dto/studentPaginated.dto'




@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgSelectModule, CommonModule, FormsModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: StudentFilter[] = [];
  filteredStudents: StudentFilter[] = [];
  searchName: string = '';
  searchAgeFrom: number | null = null;
  searchAgeTo: number | null = null;
  searchCountry: string = '';
  searchGender: string = '';
  loading: boolean = false;
  genders: string[] = ['Male', 'Female'];
  searchParams: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc'
  countries = [
    "United States",
    "Canada",
    "Germany",
    "France",
    "United Kingdom",
    "Japan",
    "Australia",
    "Brazil",
    "Italy",
    "Spain",
    "India",
    "China",
    "Mexico",
    "Russia",
    "South Korea"
  ];

  constructor(private http: HttpClient,
    private router: Router,
    private studentService: StudentService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.updateFilteredStudents();
    this.fetchStudents();
  }
  sortTable(column: string, search: boolean = false) {
    if (this.sortColumn == column && search == false) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      if (search == false) {
        this.sortDirection = 'asc';
      }
    }
  }

  fetchStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.filteredStudents = data;
        this.totalPages = Math.ceil(
          this.filteredStudents.length / this.pageSize
        );
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      },
    });
  }

  addStudent(student: Student): void {
    this.studentService.createStudent(student).subscribe(() => {
      this.updateFilteredStudents();
    });
  }


  calculateAge(dob: Date): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  deleteStudent(id: number): void {
    console.log('Deleting student with ID:', id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Student Record has been deleted.',
            icon: 'success'
          });
          this.updateFilteredStudents();
        });
      }
    });
  }
  
  // updateStudentInList(updatedStudent: any) {
  //   console.log('Updating student with ID:', updatedStudent.id);
  //   let index = this.students.findIndex((s) => s.id === updatedStudent.id);
  //   if (index !== -1) {
  //     this.students[index] = updatedStudent;
  //   }
  //   index = this.filteredStudents.findIndex((s) => s.id === updatedStudent.id);
  //   if (index !== -1) {
  //     this.filteredStudents[index] = updatedStudent;
  //   }
  // }
  

  openAddEditModal(isAddMode: boolean, student?: any) {
    const modalRef = this.modalService.open(EditStudentComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.modalTitle = isAddMode
      ? 'Add Student'
      : 'Edit Student';
    modalRef.componentInstance.student = student ? { ...student } : {};

    modalRef.componentInstance.studentUpdated.subscribe(
      (updatedStudent: any) => {
        this.updateStudentInList(updatedStudent);
      }
    );

    modalRef.componentInstance.studentAdded.subscribe((newStudent: any) => {
      this.addStudentToList(newStudent);
    });
  }
  addStudentToList(newStudent: any) {
    this.students.push(newStudent);
    if (this.students.length != this.filteredStudents.length) {
      this.filteredStudents.push(newStudent);
    }
    this.sortTable(this.sortColumn, true);
  }


  updateStudentInList(updatedStudent: any) {
    let index = this.students.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
    index = this.filteredStudents.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      this.filteredStudents[index] = updatedStudent;
    }
  }

  // addNewStudent(): void {
  //   const modalRef = this.modalService.open(StudentAddComponent);
  //   modalRef.result.then(
  //     () => this.updateFilteredStudents(),
  //     () => {}
  //   );
  // }

  updateFilteredStudents(): void {
    this.searchParams.name = this.searchName.trim();
    this.searchParams.age = this.searchAgeFrom;
    this.searchParams.ageto = this.searchAgeTo;
    this.searchParams.country = this.searchCountry.trim();
    this.searchParams.gender = this.searchGender.trim();
    this.studentService.filterStudent(this.currentPage, this.itemsPerPage, this.searchParams).subscribe((students) => {
      this.students = students.data.map((student) => ({
        ...student,
        age: this.calculateAge(student.dob)
      }));
      this.filteredStudents = this.students;
      this.totalItems = students.total;
    });
  }

  getPage(page: number) {
    this.currentPage = page;
    this.updateFilteredStudents();
  }

  handleSearch(): void {
    this.currentPage = 1;
    this.updateFilteredStudents();
  }

  resetSearch(): void {
    this.searchName = '';
    this.searchAgeFrom = null;
    this.searchAgeTo = null;
    this.searchCountry = '';
    this.searchGender = '';
    this.updateFilteredStudents();
  }
}