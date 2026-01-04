using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;

namespace ExitPoll.Application.Services
{
    public class PartyService : IPartyService
    {
        private readonly IPartyRepository _repository;

        public PartyService(IPartyRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Party>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new Party
            {
                Id= e.Id,
                Name= e.Name,
                Ideology = e.Ideology,
                FoundingDate = e.FoundingDate
            });
        }

        public async Task<Party?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new Party
            {
                Id = entity.Id,
                Name = entity.Name,
                Ideology = entity.Ideology,
                FoundingDate = entity.FoundingDate
            };
        }


        public async Task<int> CreateAsync(Party dto)
        {
            var entity = new Party
            {
                Id = dto.Id,
                Name = dto.Name,
                Ideology = dto.Ideology,
                FoundingDate = dto.FoundingDate
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }


        public async Task UpdateAsync(Party party)
        {
            var entity = new Party
            {
                Id = party.Id,
                Name = party.Name,
                Ideology = party.Ideology,
                FoundingDate = party.FoundingDate
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }


    }
}
