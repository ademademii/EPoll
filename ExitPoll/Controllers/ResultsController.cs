using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using ExitPoll.Data;
using System.Runtime.CompilerServices;

public class ResultsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public ResultsController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet("CountVotes")]
    public async Task<IActionResult> CountVotes(string partia)
    {
        var parameter = new Microsoft.Data.SqlClient.SqlParameter("@PARTIA", partia);
        var count = await _db.Database
            .ExecuteSqlRawAsync("EXEC COUNTNRVOTAVE @PARTIA", parameter);

        // Construct a JSON object with the count
        var result = new { Count = count };

        return Ok(result);
    }


    [HttpGet("GetVotesCountForParty")]
    public async Task<IActionResult> GetVotesCountForParty(string partyName)
    {
        // Assuming partyName is "PDK" in this example
        string partyNameToFind = await _db.Parties.Where(x => x.Name.Equals(partyName));

        // Find the party with the given name
        var party = await _db.Parties.FirstOrDefaultAsync(p => p.Name == partyNameToFind);

        if (party == null)
        {
            return NotFound(); // Handle if the party is not found
        }

        // Count votes for the party
        int voteCount = await _db.Votes.CountAsync(v => v.PartyId == party.Id);

        return Ok(voteCount);
    }

    //[HttpGet("CountVotesPerParty")]
    //public async Task<IActionResult> CountVotesPerParty(string partyNameInput)
    //{
    //    var partyName = await _db.Parties.FirstOrDefaultAsync(p => p.Name.Equals(partyNameInput));

    //    return Ok(partyName);
    //}


    //[HttpGet("CountVotesPerParty")]
    //public async Task<IActionResult> CountVotesPerParty(string partyNameInput)
    //{
    //    var party = await _db.Parties.Include(p => p.Votes)
    //                                  .FirstOrDefaultAsync(p => p.Name.Equals(partyNameInput));

    //    if (party == null)
    //    {
    //        return NotFound("Party not found");
    //    }

    //    int voteCount = party.Votes.Count;

    //    return Ok(voteCount);
    //}

}
