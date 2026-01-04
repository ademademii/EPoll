using ExitPoll.Domain.Entities;

namespace ExitPoll.Domain.Interfaces
{
    public interface IPartyVoteResultRepository
    {
        Task<int> GetVotesByPartyIdAsync(int partyId);
        Task<int> GetTotalVotesAsync(int projectId, string? gender, string? ageGroup);
        Task<int> GetVotesByPartyAsync(int partyId, int projectId, string? gender, string? ageGroup);
        Task<int> GetVotesByGenderAsync(string gender);
        Task<int> GetVotesByAgeGroupAsync(string ageGroup);
        Task<List<Party>> GetAllPartiesAsync();
        Task<Party?> GetPartyByNameAsync(string partyName);
    }

}
