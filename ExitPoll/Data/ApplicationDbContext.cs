using ExitPoll.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Client;

namespace ExitPoll.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        
        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<PollingPlace> PollingPlaces { get; set;}
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Party> Parties { get; set; }



    }
}
