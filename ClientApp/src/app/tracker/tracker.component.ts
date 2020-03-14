import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
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

    const employee: Employee = {
      id: this.employeeForm.get('id').value,
      firstName: this.employeeForm.get('firstName').value,
      lastName: this.employeeForm.get('lastName').value,
      department: this.employeeForm.get('department').value,
      salary: this.employeeForm.get('salary').value,
    };

    if (this.employees.some(x => x.id === employee.id)) {
      this.employeeService.updateEmployee(employee).subscribe();
    } else {
      this.employeeService.insertEmployee(employee).subscribe();
    }

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
    if (this.noRowsSelected()) {
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

  update() {
    if (this.noRowsSelected()) {
      window.alert('You must select at least one employee in order to use the Update function.');
      return;
    }

    if (this.multipleRowsSelected()) {
      window.alert('You may only select one employee when using the Update function.');
      return;
    }

    const positionOfEmployeeToUpdate = this.checkboxes.indexOf(true);

    const employee = this.employees[positionOfEmployeeToUpdate];

    this.employeeForm.setValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      department: employee.department,
      salary: employee.salary
    });
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

  noRowsSelected(): boolean {
    return !this.checkboxes.some(checkbox => checkbox === true);
  }

  multipleRowsSelected(): boolean {
    return this.checkboxes.filter(checkbox => checkbox === true).length > 1;
  }
}
