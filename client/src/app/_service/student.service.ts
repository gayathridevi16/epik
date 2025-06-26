import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentDetails {
  std_id: number;
  std_name: string;
  std_address: string;
  std_class: string;
  parent_name: string;
}

@Injectable()
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/students'; // your backend URL

  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentDetails[]> {
    return this.http.get<StudentDetails[]>(this.apiUrl);
  }
}
