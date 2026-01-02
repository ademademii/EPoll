using ExitPoll.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Domain.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetAllAsync();
        Task<City?> GetByIdAsync(int id);
        Task AddAsync(City City);
        Task UpdateAsync(City City);
        Task DeleteAsync(int id);
    }
}
