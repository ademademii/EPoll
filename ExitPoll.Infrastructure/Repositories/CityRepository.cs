using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Infrastructure.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly ApplicationDbContext _db;

        public CityRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<City>> GetAllAsync()
            => await _db.Cities.ToListAsync();

        public async Task<City?> GetByIdAsync(int id)
            => await _db.Cities.FindAsync(id);

        public async Task AddAsync(City city)
        {
            _db.Cities.Add(city);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(City city)
        {
            _db.Cities.Update(city);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.Cities.FindAsync(id);
            if (entity == null) return;
            _db.Cities.Remove(entity);
            await _db.SaveChangesAsync();
        }
    }
}
