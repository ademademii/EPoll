using ExitPoll.Domain.Entities;

namespace ExitPoll.Domain.Interfaces
{
    public interface IPartyRepository
    {
        Task<IEnumerable<Party>> GetAllAsync();
        Task<Party?> GetByIdAsync(int id);
        Task AddAsync(Party party);
        Task UpdateAsync(Party party);
        Task DeleteAsync(int id);
    }
}
