using ExitPoll.Data;
using Microsoft.AspNetCore.Mvc;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
        public async Task<IActionResult> Get(string sort = "asc")
        {
            IQueryable<VoteViewModel> voteViewModels;

            switch (sort)
            {
                case "desc":
                    voteViewModels = _db.Votes.OrderByDescending(x => x.Id)
                                              .Select(v => new VoteViewModel
                                              {
                                                  Id = v.Id,
                                                  AgeGroup = v.AgeGroup,
                                                  Gender = v.Gender,
                                                  PollingPlaceId = v.PollingPlaceId,
                                                  PartyId = v.PartyId
                                              });
                    break;
                case "asc":
                    voteViewModels = _db.Votes.OrderBy(x => x.Id)
                                              .Select(v => new VoteViewModel
                                              {
                                                  Id = v.Id,
                                                  AgeGroup = v.AgeGroup,
                                                  Gender = v.Gender,
                                                  PollingPlaceId = v.PollingPlaceId,
                                                  PartyId = v.PartyId
                                              });
                    break;
                default:
                    voteViewModels = _db.Votes.Select(v => new VoteViewModel
                    {
                        Id = v.Id,
                        AgeGroup = v.AgeGroup,
                        Gender = v.Gender,
                        PollingPlaceId = v.PollingPlaceId,
                        PartyId = v.PartyId
                    });
                    break;
            }

            return Ok(voteViewModels);
        }


        // GET api/<VotesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vote = await _db.Votes.FindAsync(id);

            if (vote == null)
            {
                return NotFound();
            }

            var voteViewModel = new VoteViewModel
            {
                Id = vote.Id,
                AgeGroup = vote.AgeGroup,
                Gender = vote.Gender,
                PollingPlaceId = vote.PollingPlaceId,
                PartyId = vote.PartyId
            };

            return Ok(voteViewModel);
        }


        // POST api/<VotesController>

        [HttpPost]

        public async Task<IActionResult> Post([FromBody] VoteViewModel voteVM)
        {
            if (ModelState.IsValid)
            {
                var vote = new Vote
                {

                    AgeGroup = voteVM.AgeGroup,
                    Gender = voteVM.Gender,
                    PollingPlaceId = voteVM.PollingPlaceId,
                    PartyId = voteVM.PartyId
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
                vote.PartyId = voteVM.PartyId;
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
