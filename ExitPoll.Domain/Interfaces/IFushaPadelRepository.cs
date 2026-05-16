using ExitPoll.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExitPoll.Domain.Interfaces
{
    public interface IFushaPadelRepository
    {
        Task<IEnumerable<FushaPadel>> GetAllAsync();
        Task<FushaPadel?> GetByIdAsync(int id);
        Task AddAsync(FushaPadel fushaPadel);
        Task UpdateAsync(FushaPadel fushaPadel);
        Task DeleteAsync(int id);
    }
}
