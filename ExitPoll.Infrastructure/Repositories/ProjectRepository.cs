using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ExitPoll.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _db;
        public  ProjectRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
            => await _db.Projects.ToListAsync();

        public async Task<Project?> GetByIdAsync(int id)
            => await _db.Projects.FindAsync(id);

        public async Task AddAsync(Project project)
        {
            _db.Projects.Add(project);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Project project)
        {
            _db.Projects.Update(project);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.Projects.FindAsync(id);
            if (entity == null) return;
            _db.Projects.Remove(entity);
            await _db.SaveChangesAsync();
        }

    }
}
