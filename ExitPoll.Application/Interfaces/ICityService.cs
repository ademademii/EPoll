using ExitPoll.Application.DTOs;


namespace ExitPoll.Application.Interfaces
{
    public interface ICityService
    {
        Task<IEnumerable<CityDto>> GetAllAsync();
        Task<CityDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(CityDto dto);
        Task UpdateAsync(CityDto dto);
        Task DeleteAsync(int id);
    }
}
