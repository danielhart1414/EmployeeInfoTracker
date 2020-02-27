using EmployeeInfoTracker.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
            // retrieve from database
            return employees;
        }

        [HttpPost]
        public Employee Insert([FromBody]Employee employee)
        {
            // write the new employee to database
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
