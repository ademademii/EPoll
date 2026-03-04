using ExitPoll.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExitPoll.Domain.Interfaces
{
    public interface IMjekuSpecialistRepository
    {
        Task<IEnumerable<MjekuSpecialist>> GetAllAsync();
        Task<MjekuSpecialist?> GetByIdAsync(int id);
        Task AddAsync(MjekuSpecialist MjekuSpecialist);
        Task UpdateAsync(MjekuSpecialist MjekuSpecialist);
        Task DeleteAsync(int id);
    }
}
