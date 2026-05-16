using ExitPoll.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Domain.Interfaces
{
    public interface IRezervimiFushesRepository
    {
        Task<IEnumerable<RezervimiFushes>> GetAllAsync();
        Task<RezervimiFushes?> GetByIdAsync(int id);
        Task AddAsync(RezervimiFushes rezervimiFushes);
        Task UpdateAsync(RezervimiFushes rezervimiFushes);
        Task DeleteAsync(int id);
    }
}
