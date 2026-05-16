using ExitPoll.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExitPoll.Infrastructure.Data
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
        public DbSet<User> Users { get; set; }

        public DbSet<FushaPadel> FushaPadels { get; set; }
        public DbSet<RezervimiFushes> RezervimiFushes { get; set; }


    }
}
