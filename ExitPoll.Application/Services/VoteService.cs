using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;

namespace ExitPoll.Application.Services
{
    public class VoteService : IVoteService
    {
        private readonly IVoteRepository _repository;

        public VoteService(IVoteRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<VoteDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new VoteDto
            {
                Id= e.Id,
                AgeGroup = e.AgeGroup,
                Gender = e.Gender,
                PollingPlaceId = e.PollingPlaceId,
                PartyId = e.PartyId,
                ProjectId = e.ProjectId,
                UserId = e.UserId
            });
        }

        public async Task<VoteDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new VoteDto
            {
                Id = entity.Id,
                AgeGroup = entity.AgeGroup,
                Gender = entity.Gender,
                PollingPlaceId = entity.PollingPlaceId,
                PartyId = entity.PartyId,
                ProjectId = entity.ProjectId,
                UserId = entity.UserId
            };
        }


        public async Task<int> CreateAsync(VoteDto dto)
        {
            var entity = new Vote
            {
                Id = dto.Id,
                AgeGroup = dto.AgeGroup,
                Gender = dto.Gender,
                PollingPlaceId = dto.PollingPlaceId,
                PartyId = dto.PartyId,
                ProjectId = dto.ProjectId,
                UserId = dto.UserId
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }


        public async Task UpdateAsync(VoteDto dto)
        {
            var entity = new Vote
            {
                Id = dto.Id,
                AgeGroup = dto.AgeGroup,
                Gender = dto.Gender,
                PollingPlaceId = dto.PollingPlaceId,
                PartyId = dto.PartyId,
                ProjectId = dto.ProjectId,
                UserId = dto.UserId
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }


    }
}
