using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;


namespace ExitPoll.Application.Services
{
    public class FushaPadelService : IFushaPadelService
    {
        private readonly IFushaPadelRepository _repository;

        public FushaPadelService(IFushaPadelRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<FushaPadelDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new FushaPadelDto
            {
                Id = e.Id,
                EmriFushes = e.EmriFushes,
                Vendodhja = e.Vendodhja
            });
        }

        public async Task<FushaPadelDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new FushaPadelDto
            {
                Id = entity.Id,
                EmriFushes = entity.EmriFushes,
                Vendodhja = entity.Vendodhja
            };
        }

        public async Task<int> CreateAsync(FushaPadelDto dto)
        {
            var entity = new FushaPadel
            {
                EmriFushes = dto.EmriFushes,
                Vendodhja = dto.Vendodhja
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }

        public async Task UpdateAsync(FushaPadelDto dto)
        {
            var entity = new FushaPadel
            {
                Id = dto.Id,
                EmriFushes = dto.EmriFushes,
                Vendodhja = dto.Vendodhja
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
