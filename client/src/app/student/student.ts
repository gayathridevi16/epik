import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService, StudentDetails } from '../_service/student.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-student',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
  providers:[StudentService]
})

export class Student {
  students = signal<StudentDetails[]>([]);
  filteredStudents = signal<StudentDetails[]>([]);
  search: string = '';
  sortColumn = 'std_id' as keyof StudentDetails;
  sortAsc = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students.set(data);
      this.filteredStudents.set(data);
    });
  }

  onSearch() {
    const term = this.search.toLowerCase();
    const filtered = this.students().filter(student =>
      Object.values(student).some(val =>
        val.toString().toLowerCase().includes(term)
      )
    );
    this.filteredStudents.set(filtered);
  }

  sortBy(column: keyof StudentDetails) {
    this.sortAsc = this.sortColumn === column ? !this.sortAsc : true;
    this.sortColumn = column;

    const sorted = [...this.filteredStudents()].sort((a: StudentDetails, b: StudentDetails) => {
    const valA = String(a[column]).toLowerCase();
    const valB = String(b[column]).toLowerCase();
    return this.sortAsc
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });
    this.filteredStudents.set(sorted);
  }
}
