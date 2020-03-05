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
            {
                employees = db.Employees.ToList();
            }
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
        public Employee Update(string id, string firstName, string lastName,
            string department, double salary, [FromBody]Employee employee)
        {
            employee.Id = id;
            employee.FirstName = firstName;
            employee.LastName = lastName;
            employee.Department = department;
            employee.Salary = salary;

            // write the updated employee to database
            return employee;
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            // delete the employee from the database
        }
    }
}
