using ExitPoll.Domain.Entities;

namespace ExitPoll.Domain.Interfaces
{
    public interface IVoteRepository
    {
        Task<IEnumerable<Vote>> GetAllAsync();

        Task<Vote?> GetByIdAsync(int id);

        Task AddAsync(Vote vote);
        Task UpdateAsync(Vote vote);
        Task DeleteAsync(int id);
    }
}
