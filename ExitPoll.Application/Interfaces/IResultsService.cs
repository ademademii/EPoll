

using ExitPoll.Application.DTOs;

namespace ExitPoll.Application.Interfaces
{
    public interface IResultsService
    {
        Task<PartyVotesResultDto> GetVotesByPartyNameAsync(string partyName);
        Task<List<PartyVotesResultDto>> GetAllPartiesWithVotesAsync(
            int projectId,
            string? gender,
            string? ageGroup
        );
        Task<int> GetVotesByGenderAsync(string gender);
        Task<int> GetVotesByAgeGroupAsync(string ageGroup);
    }

}
