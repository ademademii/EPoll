using ExitPoll.Data;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public VotersController(ApplicationDbContext db)
        {
            _db = db;
        }
        // GET: api/<VotersController>
        [HttpGet]
        public async Task<IActionResult> Get(string sort="asc")
        {
            IQueryable<Voter> voters;

            switch(sort)
            {
                case "desc":
                    voters = _db.Voters.OrderByDescending(x => x.Id);
                    break;
                case "asc":
                    voters = _db.Voters.OrderBy(x=>x.Id);
                    break;
                default:
                    voters = _db.Voters;
                    break;
            }
            return Ok(voters);
        }

        // GET api/<VotersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var voter = await _db.Voters.FindAsync(id);
            if(voter == null)
            {
                return BadRequest("No voter with this id");
            }
            return Ok(voter);
        }

        // POST api/<VotersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VoterViewModel voterVM)
        {
            if(ModelState.IsValid)
            {
                var voter = new Voter
                {
                    Age = voterVM.Age,
                    Gender = voterVM.Gender,
                    PollingPlaceId= voterVM.PollingPlaceId

                };

                _db.Voters.Add(voter);
                await _db.SaveChangesAsync();
                return Ok("Voter created successfully...");
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        // PUT api/<VotersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] VoterViewModel voterVM)
        {
            var voter = await _db.Voters.FindAsync(id);
            if(ModelState.IsValid)
            {
                voter.Age = voterVM.Age;
                voter.Gender=voterVM.Gender;
                voter.PollingPlaceId = voterVM.PollingPlaceId;
                await _db.SaveChangesAsync();
                return Ok("This voter updated successfully...");
                
            }
            return BadRequest(ModelState);
        }

        // DELETE api/<VotersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var voter = await _db.Voters.FindAsync(id);
            if(voter==null)
            {
                return BadRequest("No voter founded to be delted");
            }
            _db.Voters.Remove(voter);
            await _db.SaveChangesAsync();
            return Ok("Voter deleted successfully...");
        }
    }
}
