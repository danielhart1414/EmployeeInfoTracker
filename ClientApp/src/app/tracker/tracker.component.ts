import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  employeeForm;
  public employees: Employee[];

  constructor(
    private formBuilder: FormBuilder,
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.employeeForm = this.formBuilder.group({
      id: '',
      firstName: '',
      lastName: '',
      department: '',
      salary: ''
    });

    http.get<Employee[]>(baseUrl + 'employee')
      .subscribe(
        result => { this.employees = result; },
        error => console.error(error)
      );
  }

  ngOnInit() {
  }

  onSubmit(employeeData) {
    // Process employee data here
    this.employeeForm.reset();

    window.alert('Your employee data has been submitted');
  }
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  salary: number;
}
