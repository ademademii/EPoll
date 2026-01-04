using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ExitPoll.Infrastructure.Repositories
{
    public class PartyRepository : IPartyRepository
    {
        private readonly ApplicationDbContext _db;
        public  PartyRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Party>> GetAllAsync()
            => await _db.Parties.ToListAsync();

        public async Task<Party?> GetByIdAsync(int id)
            => await _db.Parties.FindAsync(id);

        public async Task AddAsync(Party party)
        {
            _db.Parties.Add(party);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Party party)
        {
            _db.Parties.Update(party);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.Parties.FindAsync(id);
            if (entity == null) return;
            _db.Parties.Remove(entity);
            await _db.SaveChangesAsync();
        }

    }
}
