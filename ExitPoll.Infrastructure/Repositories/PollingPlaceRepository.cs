using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ExitPoll.Infrastructure.Repositories
{
    public class PollingPlaceRepository : IPollingPlaceRepository
    {
        private readonly ApplicationDbContext _db;
        public PollingPlaceRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<PollingPlace>> GetAllAsync()
            => await _db.PollingPlaces.ToListAsync();

        public async Task<PollingPlace?> GetByIdAsync(int id)
            => await _db.PollingPlaces.FindAsync(id);

        public async Task AddAsync(PollingPlace pollingPlace)
        {
            _db.PollingPlaces.Add(pollingPlace);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(PollingPlace pollingPlace)
        {
            _db.PollingPlaces.Update(pollingPlace);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.PollingPlaces.FindAsync(id);
            if (entity == null) return;
            _db.PollingPlaces.Remove(entity);
            await _db.SaveChangesAsync();
        }

    }
}
