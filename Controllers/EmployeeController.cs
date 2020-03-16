using EmployeeInfoTracker.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeInfoTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Employee> GetAll()
        {
            var employees = new List<Employee>();

            using (var db = new EmployeeContext())
                employees = db.Employees.ToList();

            return employees;
        }

        [HttpPost]
        public Employee Insert([FromBody]Employee employee)
        {
            using (var db = new EmployeeContext())
            {
                db.Employees.Add(employee);
                db.SaveChanges();
            }
            return employee;
        }

        [HttpPut("{id}")]
        public Employee Update(string id, [FromBody]Employee updatedEmployee)
        {
            using (var db = new EmployeeContext())
            {
                var employee = db.Employees.FirstOrDefault(x => x.Id == id);
                if (employee is object)
                {
                    employee.FirstName = updatedEmployee.FirstName;
                    employee.LastName = updatedEmployee.LastName;
                    employee.Department = updatedEmployee.Department;
                    employee.Salary = updatedEmployee.Salary;
                    db.SaveChanges();
                }
            }
            return updatedEmployee;
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            using (var db = new EmployeeContext())
            {
                var employee = db.Employees.FirstOrDefault(x => x.Id == id);
                if (employee is object)
                {
                    db.Employees.Remove(employee);
                    db.SaveChanges();
                }
            }
        }
    }
}
