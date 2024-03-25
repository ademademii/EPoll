using ExitPoll.Data;
using Microsoft.AspNetCore.Mvc;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotesController : ControllerBase
    {

        public readonly ApplicationDbContext _db;
        public VotesController(ApplicationDbContext db)
        {
            _db = db;
        }
        // GET: api/<VotesController>
        [HttpGet]
        public async Task<IActionResult> Get(string sort="asc")
        {
            IQueryable<Vote> votes;

            switch(sort)
            {
                case "desc":
                    votes = _db.Votes.OrderByDescending(x => x.Id);
                    break;
                case "asc":
                    votes = _db.Votes.OrderBy(x => x.Id);
                    break;
                default:
                    votes= _db.Votes;
                    break;
            }

            return Ok(votes);
        }

        // GET api/<VotesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vote = await _db.Votes.FindAsync(id);   
            return Ok(vote);
        }

        // POST api/<VotesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VoteViewModel voteVM)
        {
            if (ModelState.IsValid)
            {
                var vote = new Vote
                {
                    VoterId = voteVM.Id,
                    CandidateId = voteVM.CandidateId
                };
                _db.Votes.Add(vote);
                await _db.SaveChangesAsync();
                return Ok("Vote created successfully...");
            }
            return BadRequest(ModelState);
        }

        // PUT api/<VotesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] VoteViewModel voteVM)
        {
            var vote = await _db.Votes.FindAsync(id);
            if(ModelState.IsValid)
            {
                vote.VoterId= voteVM.Id;
                vote.CandidateId = voteVM.CandidateId;
                await _db.SaveChangesAsync();
                return Ok("Vote updated successfully...");
            }
            return BadRequest(ModelState);
        }


        // DELETE api/<VotesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var vote = await _db.Votes.FindAsync(id);
            if(vote == null)
            {
                return BadRequest("No votes founded to be delteted with this id");
            }
            _db.Votes.Remove(vote);
            await _db.SaveChangesAsync();
            return Ok("Vote deleted successfully...");
        }
    }
}
