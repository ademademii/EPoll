using ExitPoll.Domain.Entities;


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
