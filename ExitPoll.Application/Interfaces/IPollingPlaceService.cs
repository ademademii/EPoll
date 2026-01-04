using ExitPoll.Application.DTOs;

namespace ExitPoll.Application.Interfaces
{
    public interface IPollingPlaceService
    {
        Task<IEnumerable<PollingPlaceDto>> GetAllAsync();
        Task<PollingPlaceDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(PollingPlaceDto dto);
        Task UpdateAsync(PollingPlaceDto dto);
        Task DeleteAsync(int id);
    }
}
