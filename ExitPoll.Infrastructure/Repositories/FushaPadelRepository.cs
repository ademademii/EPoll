using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ExitPoll.Infrastructure.Repositories
{
    public class FushaPadelRepository : IFushaPadelRepository
    {
        private readonly ApplicationDbContext _db;

        public FushaPadelRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<FushaPadel>> GetAllAsync()
            => await _db.FushaPadels.ToListAsync();

        public async Task<FushaPadel?> GetByIdAsync(int id)
            => await _db.FushaPadels.FindAsync(id);

        public async Task AddAsync(FushaPadel fushaPadel)
        {
            _db.FushaPadels.Add(fushaPadel);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(FushaPadel fushaPadel)
        {
            _db.FushaPadels.Update(fushaPadel);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.FushaPadels.FindAsync(id);
            if (entity == null) return;
            _db.FushaPadels.Remove(entity);
            await _db.SaveChangesAsync();
        }
    }
}
