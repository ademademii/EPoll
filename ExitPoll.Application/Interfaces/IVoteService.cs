using ExitPoll.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Application.Interfaces
{
    public interface IVoteService
    {
        Task<IEnumerable<VoteDto>> GetAllAsync();
        Task<VoteDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(VoteDto dto);
        Task UpdateAsync(VoteDto dto);
        Task DeleteAsync(int id);
    }
}
