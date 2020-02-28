namespace EmployeeInfoTracker.Models
{
    public class Employee
    {
        public Employee(string id, string firstName, string lastName, string department, double salary)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Department = department;
            Salary = salary;
        }

        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Department { get; set; }

        public double Salary { get; set; }
    }
}
