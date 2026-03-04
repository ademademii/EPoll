using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExitPoll.Infrastructure.Repositories
{
    public class MjekuSpecialistRepository : IMjekuSpecialistRepository
    {
        private readonly ApplicationDbContext _db;

        public MjekuSpecialistRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<MjekuSpecialist>> GetAllAsync()
            => await _db.Mjeket.ToListAsync();

        public async Task<MjekuSpecialist?> GetByIdAsync(int id)
            => await _db.Mjeket.FindAsync(id);

        public async Task AddAsync(MjekuSpecialist mjekuSpecialist)
        {
            _db.Mjeket.Add(mjekuSpecialist);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(MjekuSpecialist mjekuSpecialist)
        {
            _db.Mjeket.Update(mjekuSpecialist);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _db.Mjeket.FindAsync(id);
            if (entity == null) return;
            _db.Mjeket.Remove(entity);
            await _db.SaveChangesAsync();
        }
    }
}
