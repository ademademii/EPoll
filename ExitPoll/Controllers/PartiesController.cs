using ExitPoll.Data;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartiesController : ControllerBase
    {
        public readonly ApplicationDbContext _db;
        public PartiesController(ApplicationDbContext dbContext) 
        {
            _db = dbContext;
        }

        // GET: api/<PartiesController>
        [HttpGet]
        public async Task<IActionResult> Get(string sort="asc")
        {
            IQueryable<Party> parties;
            switch (sort)
            {
                case "desc":
                    parties = _db.Parties.OrderByDescending(x => x.Id);
                    break;
                case "asc":
                    parties = _db.Parties.OrderBy(x => x.Id);
                    break;
                default:
                    parties= _db.Parties;
                    break;
            }
            return Ok(parties);
        }

        // GET api/<PartiesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PartiesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Party party)
        {
            if (ModelState.IsValid)
            {
                var party1 = new Party
                {
                    Name = party.Name,
                    Ideology  = party.Ideology,
                    FoundingDate = party.FoundingDate,

                };
                _db.Parties.Add(party);
                await _db.SaveChangesAsync();
                return Ok("Party created successfully...");
            }
            else
            {
                return BadRequest("Party not created...");
            }
        }

        // PUT api/<PartiesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PartiesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
