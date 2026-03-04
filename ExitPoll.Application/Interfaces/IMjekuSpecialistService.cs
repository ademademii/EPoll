using ExitPoll.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExitPoll.Application.Interfaces
{
    public interface IMjekuSpecialistService
    {
        Task<IEnumerable<MjekuSpecialistDto>> GetAllAsync();
        Task<MjekuSpecialistDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(MjekuSpecialistDto dto);
        Task UpdateAsync(MjekuSpecialistDto dto);
        Task DeleteAsync(int id);
    }
}
