using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using ExitPoll.Domain.Interfaces;

namespace ExitPoll.Application.Services
{
    public class ResultsService : IResultsService
    {
        private readonly IPartyVoteResultRepository _repository;

        public ResultsService(IPartyVoteResultRepository repository)
        {
            _repository = repository;
        }

        public async Task<PartyVotesResultDto> GetVotesByPartyNameAsync(string partyName)
        {
            var party = await _repository.GetPartyByNameAsync(partyName)
                ?? throw new Exception("Party not found");

            var votes = await _repository.GetVotesByPartyIdAsync(party.Id);

            return new PartyVotesResultDto
            {
                PartyName = party.Name,
                VoteCount = votes
            };
        }

        public async Task<List<PartyVotesResultDto>> GetAllPartiesWithVotesAsync(
            int projectId, string? gender, string? ageGroup)
        {
            var parties = await _repository.GetAllPartiesAsync();
            var totalVotes = await _repository.GetTotalVotesAsync(projectId, gender, ageGroup);

            var results = new List<PartyVotesResultDto>();

            foreach (var party in parties)
            {
                var votes = await _repository.GetVotesByPartyAsync(
                    party.Id, projectId, gender, ageGroup);

                results.Add(new PartyVotesResultDto
                {
                    PartyName = party.Name,
                    VoteCount = votes,
                    Percentage = totalVotes == 0 ? 0 : (double)votes / totalVotes * 100
                });
            }

            return results;
        }

        public Task<int> GetVotesByGenderAsync(string gender)
            => _repository.GetVotesByGenderAsync(gender);

        public Task<int> GetVotesByAgeGroupAsync(string ageGroup)
            => _repository.GetVotesByAgeGroupAsync(ageGroup);
    }


}
