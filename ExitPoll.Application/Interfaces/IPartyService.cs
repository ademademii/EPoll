using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Entities;

namespace ExitPoll.Application.Interfaces
{
    public interface IPartyService
    {
        Task<IEnumerable<Party>> GetAllAsync();
        Task<Party?> GetByIdAsync(int id);
        Task<int> CreateAsync(Party dto);
        Task UpdateAsync(Party dto);
        Task DeleteAsync(int id);
    }
}
