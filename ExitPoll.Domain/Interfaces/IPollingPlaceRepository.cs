using ExitPoll.Domain.Entities;

namespace ExitPoll.Domain.Interfaces
{
    public interface IPollingPlaceRepository
    {
        Task<IEnumerable<PollingPlace>> GetAllAsync();

        Task<PollingPlace?> GetByIdAsync(int id);

        Task AddAsync(PollingPlace pollingPlace);
        Task UpdateAsync(PollingPlace pollingPlace);
        Task DeleteAsync(int id);
    }
}
