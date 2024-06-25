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
    public async Task<IActionResult> GetAllPartiesWithVotesAndPercentage(int projectId)
    {
  
        var parties = await _db.Parties.ToListAsync();

        List<PartyVotesResult> results = new List<PartyVotesResult>();

        int totalVotes = await _db.Votes.CountAsync();

        foreach (var party in parties)
        {
            int voteCount = await _db.Votes.CountAsync(v => v.PartyId == party.Id && v.ProjectId==projectId);

            double percentage = totalVotes > 0 ? (double)voteCount / totalVotes * 100 : 0;

            var result = new PartyVotesResult
            {
                PartyName = party.Name,
                VoteCount = voteCount,
                Percentage = percentage
            };

            results.Add(result);
        }

        return Ok(results);
    }

}
