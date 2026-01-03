using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;


namespace ExitPoll.Application.Services
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _repository;

        public CityService(ICityRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CityDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new CityDto
            {
                Id = e.Id,
                Name = e.Name,
                Descriptions = e.Descriptions,
                Population = e.Population,
                ZipCode = e.ZipCode,
                Area = e.Area,
                StateId = e.StateId
            });
        }

        public async Task<CityDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new CityDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Descriptions = entity.Descriptions,
                Population = entity.Population,
                ZipCode = entity.ZipCode,
                Area = entity.Area,
                StateId = entity.StateId
            };
        }

        public async Task<int> CreateAsync(CityDto dto)
        {
            var entity = new City
            {
                Name = dto.Name,
                Descriptions = dto.Descriptions,
                Population = dto.Population,
                ZipCode = dto.ZipCode,
                Area = dto.Area,
                StateId = dto.StateId
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }

        public async Task UpdateAsync(CityDto dto)
        {
            var entity = new City
            {
                Id = dto.Id,
                Name = dto.Name,
                Descriptions = dto.Descriptions,
                Population = dto.Population,
                ZipCode = dto.ZipCode,
                Area = dto.Area,
                StateId = dto.StateId
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
