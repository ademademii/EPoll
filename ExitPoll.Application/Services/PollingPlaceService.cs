using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;

namespace ExitPoll.Application.Services
{
    public class PollingPlaceService : IPollingPlaceService
    {
        private readonly IPollingPlaceRepository _repository;

        public PollingPlaceService(IPollingPlaceRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PollingPlaceDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new PollingPlaceDto
            {
                Id = e.Id,
                Name = e.Name,
                Address = e.Address,
                Population = e.Population,
                OpeningTime = e.OpeningTime,
                CloseingTime = e.CloseingTime,
                CityId = e.CityId
            });
        }

        public async Task<PollingPlaceDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new PollingPlaceDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Address = entity.Address,
                Population = entity.Population,
                OpeningTime = entity.OpeningTime,
                CloseingTime = entity.CloseingTime,
                CityId = entity.CityId
            };
        }


        public async Task<int> CreateAsync(PollingPlaceDto dto)
        {
            var entity = new PollingPlace
            {
                Id = dto.Id,
                Name = dto.Name,
                Address = dto.Address,
                Population = dto.Population,
                OpeningTime = dto.OpeningTime,
                CloseingTime = dto.CloseingTime,
                CityId = dto.CityId
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }


        public async Task UpdateAsync(PollingPlaceDto pollingPlace)
        {
            var entity = new PollingPlace
            {
                Id = pollingPlace.Id,
                Name = pollingPlace.Name,
                Address = pollingPlace.Address,
                Population = pollingPlace.Population,
                OpeningTime = pollingPlace.OpeningTime,
                CloseingTime = pollingPlace.CloseingTime,
                CityId = pollingPlace.CityId
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }


    }
}
