import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') urlString: string
  ) {
    this.baseUrl = urlString;
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'employee');
  }

  insertEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl + 'employee', employee);
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(
      this.baseUrl + 'employee/' + employee.id,
      employee
    );
  }

  deleteEmployee(employee: Employee): Observable<{}> {
    return this.http.delete(this.baseUrl + 'employee/' + employee.id);
  }
}
