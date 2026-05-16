using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ExitPoll.Infrastructure.Repositories
{
    public class RezervimiFushesRepository : IRezervimiFushesRepository
    {
        private readonly ApplicationDbContext _db;

        public RezervimiFushesRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<RezervimiFushes>> GetAllAsync()
            => await _db.RezervimiFushes.ToListAsync();

        public async Task<RezervimiFushes?> GetByIdAsync(int id)
            => await _db.RezervimiFushes.FindAsync(id);

        public async Task AddAsync(RezervimiFushes rezervimiFushes)
        {
            _db.RezervimiFushes.Add(rezervimiFushes);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(RezervimiFushes rezervimiFushes)
        {
            _db.RezervimiFushes.Update(rezervimiFushes);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.RezervimiFushes.FindAsync(id);
            if (entity == null) return;
            _db.RezervimiFushes.Remove(entity);
            await _db.SaveChangesAsync();
        }
    }
}
