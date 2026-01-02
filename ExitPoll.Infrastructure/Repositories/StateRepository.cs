using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Infrastructure.Repositories
{
    public class StateRepository : IStateRepository
    {
        private readonly ApplicationDbContext _db;

        public StateRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<State>> GetAllAsync()
            => await _db.States.ToListAsync();

        public async Task<State?> GetByIdAsync(int id)
            => await _db.States.FindAsync(id);

        public async Task AddAsync(State state)
        {
            _db.States.Add(state);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(State state)
        {
            _db.States.Update(state);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.States.FindAsync(id);
            if (entity == null) return;
            _db.States.Remove(entity);
            await _db.SaveChangesAsync();
        }
    }
}
