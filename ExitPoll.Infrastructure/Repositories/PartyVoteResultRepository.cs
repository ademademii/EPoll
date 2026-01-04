using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ExitPoll.Infrastructure.Repositories
{
    public class PartyVoteResultRepository : IPartyVoteResultRepository
    {
        private readonly ApplicationDbContext _db;

        public PartyVoteResultRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Party?> GetPartyByNameAsync(string partyName)
        {
            return await _db.Parties
                .FirstOrDefaultAsync(p => p.Name == partyName);
        }

        public async Task<List<Party>> GetAllPartiesAsync()
        {
            return await _db.Parties.ToListAsync();
        }

        public async Task<int> GetVotesByPartyIdAsync(int partyId)
        {
            return await _db.Votes
                .CountAsync(v => v.PartyId == partyId);
        }

        public async Task<int> GetTotalVotesAsync(int projectId, string? gender, string? ageGroup)
        {
            var query = _db.Votes.AsQueryable()
                .Where(v => v.ProjectId == projectId);

            if (!string.IsNullOrEmpty(gender))
                query = query.Where(v => v.Gender.ToString().ToLower() == gender.ToLower());

            if (!string.IsNullOrEmpty(ageGroup))
                query = query.Where(v => v.AgeGroup.ToString().ToLower() == ageGroup.ToLower());

            return await query.CountAsync();
        }

        public async Task<int> GetVotesByPartyAsync(int partyId, int projectId, string? gender, string? ageGroup)
        {
            var query = _db.Votes.AsQueryable()
                .Where(v => v.ProjectId == projectId && v.PartyId == partyId);

            if (!string.IsNullOrEmpty(gender))
                query = query.Where(v => v.Gender.ToString().ToLower() == gender.ToLower());

            if (!string.IsNullOrEmpty(ageGroup))
                query = query.Where(v => v.AgeGroup.ToString().ToLower() == ageGroup.ToLower());

            return await query.CountAsync();
        }

        public async Task<int> GetVotesByGenderAsync(string gender)
        {
            return await _db.Votes
                .CountAsync(v => v.Gender.ToString().ToLower() == gender.ToLower());
        }

        public async Task<int> GetVotesByAgeGroupAsync(string ageGroup)
        {
            return await _db.Votes
                .CountAsync(v => v.AgeGroup.ToString().ToLower() == ageGroup.ToLower());
        }
    }

}
