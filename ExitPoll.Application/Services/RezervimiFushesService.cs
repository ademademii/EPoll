using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;


namespace ExitPoll.Application.Services
{
    public class RezervimiFushesService : IRezervimiFushesService
    {
        private readonly IRezervimiFushesRepository _repository;

        public RezervimiFushesService(IRezervimiFushesRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RezervimiFushesDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new RezervimiFushesDto
            {
                Id = e.Id,
                EmriRezervuesit = e.EmriRezervuesit,
                NrPersonave = e.NrPersonave,
                FushaPadelId = e.FushaPadelId,
            });
        }

        public async Task<RezervimiFushesDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new RezervimiFushesDto
            {
                Id = entity.Id,
                EmriRezervuesit = entity.EmriRezervuesit,
                NrPersonave = entity.NrPersonave,
                FushaPadelId = entity.FushaPadelId
            };
        }

        public async Task<int> CreateAsync(RezervimiFushesDto dto)
        {
            var entity = new RezervimiFushes
            {
                Id= dto.Id,
                EmriRezervuesit = dto.EmriRezervuesit,
                NrPersonave = dto.NrPersonave,
                FushaPadelId = dto.FushaPadelId
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }




        public async Task UpdateAsync(RezervimiFushesDto dto)
        {
            var entity = new RezervimiFushes
            {
                Id = dto.Id,
                EmriRezervuesit = dto.EmriRezervuesit,
                NrPersonave = dto.NrPersonave,
                FushaPadelId = dto.FushaPadelId
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
