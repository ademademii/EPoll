using ExitPoll.Application.DTOs;


namespace ExitPoll.Application.Interfaces
{
    public interface IFushaPadelService
    {
        Task<IEnumerable<FushaPadelDto>> GetAllAsync();
        Task<FushaPadelDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(FushaPadelDto dto);
        Task UpdateAsync(FushaPadelDto dto);
        Task DeleteAsync(int id);   
    }
}
