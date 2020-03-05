using EmployeeInfoTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeInfoTracker
{
    public class EmployeeContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./employeeData.db");
        }
    }
}
