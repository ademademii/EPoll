using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExitPoll.Application.Services
{
    public class StateService : IStateService
    {
        private readonly IStateRepository _repository;

        public StateService(IStateRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<StateDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new StateDto
            {
                Id = e.Id,
                Name = e.Name,
                Population = e.Population
            });
        }

        public async Task<StateDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new StateDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Population = entity.Population
            };
        }

        public async Task<int> CreateAsync(StateDto dto)
        {
            var entity = new State
            {
                Name = dto.Name,
                Population = dto.Population
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }

        public async Task UpdateAsync(StateDto dto)
        {
            var entity = new State
            {
                Id = dto.Id,
                Name = dto.Name,
                Population = dto.Population
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
