using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using ExitPoll.Infrastructure.Data;


namespace ExitPoll.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<User>> GetAllAsync(string sort)
        {
            return sort == "desc"
                ? await _db.Users.OrderByDescending(x => x.Id).ToListAsync()
                : await _db.Users.OrderBy(x => x.Id).ToListAsync();
        }

        public Task<User?> GetByIdAsync(int id) => _db.Users.FindAsync(id).AsTask();
        public Task<User?> GetByUsernameAsync(string username)
            => _db.Users.FirstOrDefaultAsync(x => x.UserName == username);

        public Task<bool> UsernameExistsAsync(string username)
            => _db.Users.AnyAsync(x => x.UserName == username);

        public async Task AddAsync(User user) => await _db.Users.AddAsync(user);
        public Task UpdateAsync(User user) { _db.Users.Update(user); return Task.CompletedTask; }
        public Task DeleteAsync(User user) { _db.Users.Remove(user); return Task.CompletedTask; }
        public Task SaveChangesAsync() => _db.SaveChangesAsync();
    }

}
