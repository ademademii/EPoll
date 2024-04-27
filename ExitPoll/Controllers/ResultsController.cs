using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using ExitPoll.Data;

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

}
