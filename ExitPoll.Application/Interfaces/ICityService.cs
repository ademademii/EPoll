using ExitPoll.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

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
