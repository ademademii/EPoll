using ExitPoll.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Application.Interfaces
{
    public interface IStateService
    {
        Task<IEnumerable<StateDto>> GetAllAsync();
        Task<StateDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(StateDto dto);
        Task UpdateAsync(StateDto dto);
        Task DeleteAsync(int id);
    }
}
