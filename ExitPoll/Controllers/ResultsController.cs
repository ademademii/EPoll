using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using ExitPoll.Data;
using System.Runtime.CompilerServices;
using ExitPoll.Models.ViewModels;

public class ResultsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public ResultsController(ApplicationDbContext db)
    {
        _db = db;
    }


    [HttpGet("GetVotesAndPartyName")]
    public async Task<IActionResult> GetVotesAndPartyName(string partyName)
    {
        // Find the party with the given name
        var party = await _db.Parties.FirstOrDefaultAsync(p => p.Name == partyName);

        if (party == null)
        {
            return NotFound(); // Handle if the party is not found
        }

        // Count votes for the party
        int voteCount = await _db.Votes.CountAsync(v => v.PartyId == party.Id);

        // Prepare result object
        var result = new PartyVotesResult
        {
            PartyName = party.Name,
            VoteCount = voteCount
        };

        return Ok(result);
    }


    [HttpGet("GetAllPartiesWithVotesAndPercentage")]
    public async Task<IActionResult> GetAllPartiesWithVotesAndPercentage(int projectId,string gender = null,string ageGroup = null)
    {
        var parties = await _db.Parties.ToListAsync();
        List<PartyVotesResult> results = new List<PartyVotesResult>();

        // Filter votes by project + optional gender + optional age group
        var votesQuery = _db.Votes.AsQueryable();
        votesQuery = votesQuery.Where(v => v.ProjectId == projectId);

        if (!string.IsNullOrEmpty(gender))
        {
            votesQuery = votesQuery.Where(v => v.Gender.ToString().ToLower() == gender.ToLower());
        }

        if (!string.IsNullOrEmpty(ageGroup))
        {
            votesQuery = votesQuery.Where(v => v.AgeGroup.ToString().ToLower() == ageGroup.ToLower());
        }

        int totalVotes = await votesQuery.CountAsync();

        foreach (var party in parties)
        {
            int voteCount = await votesQuery.CountAsync(v => v.PartyId == party.Id);

            double percentage = totalVotes > 0 ? (double)voteCount / totalVotes * 100 : 0;

            results.Add(new PartyVotesResult
            {
                PartyName = party.Name,
                VoteCount = voteCount,
                Percentage = percentage
            });
        }

        return Ok(results);
    }



    [HttpGet("GetBasedOnGender")]
    public async Task<IActionResult> GetBasedOnGender(string gender)
    {
        var votes = await _db.Votes.ToListAsync();

        int voteCount = 0;

        foreach (var vote in votes)
        {
            voteCount = await _db.Votes.CountAsync(v => v.Gender.ToString().ToLower() == gender);
        }

        return Ok(voteCount);
    }


    [HttpGet("GetBasedAgeGroup")]
    public async Task<IActionResult> GetBasedAgeGroup(string ageGroup)
    {
        var votes = await _db.Votes.ToListAsync();

        int voteCount = 0;

        foreach (var vote in votes)
        {
            voteCount = await _db.Votes.CountAsync(v => v.AgeGroup.ToString().ToLower() == ageGroup);
        }

        return Ok(voteCount);
    }

}
