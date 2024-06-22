import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentService } from '../../service/student.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentEditComponent } from '../student-edit/student-edit.component';

@Component({
  selector: 'student-list',
  standalone: true,
  imports: [NgSelectModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  countryFilter: any;
  genderFilter: any;
  entriesPerPage: any;
  availableCountries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];
  studentList: any[] = [];
  filteredStudentList: any[] = [];
  currentPageNumber: number = 1;
  totalNumberOfPages: number = 0;
  numberOfEntries: number = 10;
  columnToSortBy: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  selectedGenderList: string[] = [];
  nameFilter: string = '';
  minAgeFilter: number | null = null;
  maxAgeFilter: number | null = null;

  genderOptions = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];

  entriesOptions = [
    { id: 1, name: '5' },
    { id: 2, name: '10' },
    { id: 3, name: '15' },
    { id: 4, name: '20' },
    { id: 5, name: '25' },
  ];

  constructor(
    private httpClient: HttpClient,
    private routerService: Router,
    private studentService: StudentService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadCountries();
    this.loadStudents();
  }

  loadCountries() {
    this.httpClient.get<any[]>('assets/countries.json').subscribe({
      next: (data) => {
        this.availableCountries = data;
      },
      error: (error) => {
        console.error('Error loading countries:', error);
      },
    });
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalNumberOfPages }, (_, i) => i + 1);
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.studentList = data;
        this.filteredStudentList = data;
        this.totalNumberOfPages = Math.ceil(
          this.filteredStudentList.length / this.numberOfEntries
        );
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      },
    });
  }

  onGenderFilterChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedGenderList.push(value);
    } else {
      this.selectedGenderList = this.selectedGenderList.filter(gender => gender !== value);
    }
    this.filterStudents();
  }

  onEntriesChange() {
    this.totalNumberOfPages = Math.ceil(this.filteredStudentList.length / this.numberOfEntries);
    this.goToFirstPage();
  }

  onEntriesClear() {
    this.entriesPerPage = 10;
    this.numberOfEntries = 10;
    this.onEntriesChange();
  }

  sortTable(column: string, isSearch: boolean = false) {
    if (this.columnToSortBy == column && isSearch == false) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.columnToSortBy = column;
      if (isSearch == false) {
        this.sortOrder = 'asc';
      }
    }

    this.filteredStudentList.sort((a, b) => {
      const compareA = typeof a[column] === 'string' ? a[column].toLowerCase() : a[column];
      const compareB = typeof b[column] === 'string' ? b[column].toLowerCase() : b[column];

      if (compareA < compareB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (compareA > compareB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalNumberOfPages) {
      this.currentPageNumber = page;
    }
  }

  goToFirstPage() {
    this.goToPage(1);
  }

  goToLastPage() {
    this.goToPage(this.totalNumberOfPages);
  }

  goToPreviousPage() {
    this.goToPage(this.currentPageNumber - 1);
  }

  goToNextPage() {
    this.goToPage(this.currentPageNumber + 1);
  }

  filterStudents() {
    this.filteredStudentList = this.studentList.filter((student) => {
      const nameMatch = student.name.toLowerCase().includes(this.nameFilter?.toLowerCase() ?? '');
      const countryMatch = this.countryFilter ? student.country === this.countryFilter : true;
      const genderMatch = this.genderFilter ? student.gender === this.genderFilter : true;
      const ageMatch =
        (this.minAgeFilter ? student.age >= this.minAgeFilter : true) &&
        (this.maxAgeFilter ? student.age <= this.maxAgeFilter : true);

      return nameMatch && countryMatch && genderMatch && ageMatch;
    });
    this.totalNumberOfPages = Math.ceil(this.filteredStudentList.length / this.numberOfEntries);
    this.goToFirstPage();
    this.sortTable(this.columnToSortBy, true);
  }

  resetFilters() {
    this.nameFilter = '';
    this.countryFilter = null;
    this.minAgeFilter = null;
    this.maxAgeFilter = null;
    this.genderFilter = null;
    this.filteredStudentList = [...this.studentList];
    this.totalNumberOfPages = Math.ceil(this.filteredStudentList.length / this.numberOfEntries);
    this.sortTable(this.columnToSortBy, true);
  }

  get paginatedStudentList(): any[] {
    const startIndex = (this.currentPageNumber - 1) * this.numberOfEntries;
    return this.filteredStudentList.slice(startIndex, startIndex + this.numberOfEntries);
  }

  getMaxIndexDisplayed(): number {
    const endIndex = this.currentPageNumber * this.numberOfEntries;
    return Math.min(endIndex, this.filteredStudentList.length);
  }

  confirmStudentDeletion(student: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${student.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent(student.id);
      }
    });
  }

  deleteStudent(studentId: number) {
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        Swal.fire('Deleted!', 'The student has been deleted.', 'success');
        this.filteredStudentList = this.filteredStudentList.filter(
          (s) => s.id !== studentId
        );
        this.studentList = this.studentList.filter((s) => s.id !== studentId);
        if (this.paginatedStudentList.length === 0 && this.currentPageNumber > 1) {
          this.currentPageNumber--;
        }
        this.totalNumberOfPages = Math.ceil(
          this.filteredStudentList.length / this.numberOfEntries
        );
      },
      (error) => {
        Swal.fire('Error!', 'Failed to delete the student.', 'error');
        console.error('Error deleting student:', error);
      }
    );
  }

  openAddEditModal(isAddMode: boolean, student?: any) {
    const modalRef = this.modalService.open(StudentEditComponent, {
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

  updateStudentInList(updatedStudent: any) {
    let index = this.studentList.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      this.studentList[index] = updatedStudent;
    }
    index = this.filteredStudentList.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      this.filteredStudentList[index] = updatedStudent;
    }
  }

  addStudentToList(newStudent: any) {
    this.studentList.push(newStudent);
    if (this.studentList.length != this.filteredStudentList.length) {
      this.filteredStudentList.push(newStudent);
    }
    this.sortTable(this.columnToSortBy, true);
  }
}
