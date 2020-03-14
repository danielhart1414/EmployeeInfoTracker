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
  checkboxes: boolean[];

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
  }

  ngOnInit() {
    this.refreshTable();
  }

  onSubmit() {
    if (this.anEmployeeFormFieldIsBlank()) {
      window.alert('Please enter information into every field');
      return;
    }

    if (isNaN(this.employeeForm.get('salary').value)) {
      window.alert('Please enter a number in the Salary field');
      return;
    }

    const newEmployee: Employee = {
      id: this.employeeForm.get('id').value,
      firstName: this.employeeForm.get('firstName').value,
      lastName: this.employeeForm.get('lastName').value,
      department: this.employeeForm.get('department').value,
      salary: this.employeeForm.get('salary').value,
    };

    this.employeeService.insertEmployee(newEmployee).subscribe();
    this.employeeForm.reset();

    window.alert('Your employee data has been submitted');

    this.refreshTable();
  }

  anEmployeeFormFieldIsBlank(): boolean {
    return this.employeeForm.get('id').value === '' ||
      this.employeeForm.get('firstName').value === '' ||
      this.employeeForm.get('lastName').value === '' ||
      this.employeeForm.get('department').value === '' ||
      this.employeeForm.get('salary').value === '';
  }

  toggleSelection(event, i) {
    this.checkboxes[i] = event.target.checked;
  }

  async deleteRows() {
    const noRowsSelected = !this.checkboxes.some(checkbox => checkbox === true);

    if (noRowsSelected) {
      window.alert('You must select at least one employee in order to use the Delete function.');
      return;
    }

    for (let i = this.checkboxes.length - 1; i >= 0; i--) {
      if (this.checkboxes[i]) {
        await this.employeeService.deleteEmployee(this.employees[i]).toPromise();
      }
    }

    this.refreshTable();
  }

  refreshTable() {
    this.employeeService.getEmployees()
      .subscribe(
        result => {
          this.employees = result;
          this.checkboxes = new Array(result.length);
          this.checkboxes.fill(false);
        },
        error => console.error(error)
      );
  }
}
