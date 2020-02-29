import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  employeeForm;
  employees: Employee[];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.formBuilder.group({
      id: '',
      firstName: '',
      lastName: '',
      department: '',
      salary: ''
    });

    employeeService.getEmployees()
      .subscribe(
        result => { this.employees = result; },
        error => console.error(error)
      );
  }

  ngOnInit() {
  }

  onSubmit(employeeData) {
    if (isNaN(this.employeeForm.get('salary').value)) {
      window.alert('Please enter a number in the Salary field');
      return;
    }

    if (this.employeeForm.get('id').value === '' ||
        this.employeeForm.get('firstName').value === '' ||
        this.employeeForm.get('lastName').value === '' ||
        this.employeeForm.get('department').value === '' ||
        this.employeeForm.get('salary').value === '') {
      window.alert('Please enter information into every field');
      return;
    }

    // Process employee data here
    this.employeeForm.reset();

    window.alert('Your employee data has been submitted');
  }
}
