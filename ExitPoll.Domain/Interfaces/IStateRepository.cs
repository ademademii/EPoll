using ExitPoll.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Domain.Interfaces
{
    public interface IStateRepository
    {
        Task<IEnumerable<State>> GetAllAsync();
        Task<State?> GetByIdAsync(int id);
        Task AddAsync(State state);
        Task UpdateAsync(State state);
        Task DeleteAsync(int id);
    }
}
