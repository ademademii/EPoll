using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ExitPoll.Infrastructure.Repositories
{
    public class VoteRepository : IVoteRepository
    {
        private readonly ApplicationDbContext _db;
        public VoteRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Vote>> GetAllAsync()
            => await _db.Votes.ToListAsync();

        public async Task<Vote?> GetByIdAsync(int id)
            => await _db.Votes.FindAsync(id);

        public async Task AddAsync(Vote vote)
        {
            _db.Votes.Add(vote);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Vote vote)
        {
            _db.Votes.Update(vote);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.Votes.FindAsync(id);
            if (entity == null) return;
            _db.Votes.Remove(entity);
            await _db.SaveChangesAsync();
        }

    }
}
