using ExitPoll.Application.DTOs;


namespace ExitPoll.Application.Interfaces
{
    public interface IRezervimiFushesService
    {
        Task<IEnumerable<RezervimiFushesDto>> GetAllAsync();
        Task<RezervimiFushesDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(RezervimiFushesDto dto);
        Task UpdateAsync(RezervimiFushesDto dto);
        Task DeleteAsync(int id);   
    }
}
