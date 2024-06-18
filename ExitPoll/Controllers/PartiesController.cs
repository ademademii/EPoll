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
        public async Task<IActionResult> Get(int id)
        {
            var party = await _db.Parties.FindAsync(id);

            if(party == null)
            {
                return BadRequest("This object does not exist in the database...");
            }    

            return Ok(party);
        }


        [HttpGet]
        [Route("Search/{search=}")]
        public async Task<IActionResult> Search(string search)
        {
            IQueryable<Party> parties = _db.Parties.Where(x=>x.Name.Contains(search));
            return Ok(parties);
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
                return Ok("Created successfully...");
            }
            else
            {
                return BadRequest("Creation failed. Please check the data and try again...");
            }
        }

        // PUT api/<PartiesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Party party)
        {
            var entity = await _db.Parties.FindAsync(id);

            if(ModelState.IsValid)
            {
                entity.Name = party.Name;
                entity.Ideology = party.Ideology;
                entity.FoundingDate = party.FoundingDate;
                _db.Parties.Update(entity);
                await _db.SaveChangesAsync();
                return Ok("Updated successfully...");
            }
            else
            {
                return BadRequest("Update failed. Please check the data and try again...");
            }

        }

        // DELETE api/<PartiesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var party = await _db.Parties.FindAsync(id);
            if (party == null)
            {
                return BadRequest("No records found to delete...");
            }
            else
            {
                _db.Parties.Remove(party);
                await _db.SaveChangesAsync();
                return Ok("Deleted successfully...");
            }
        }
    }
}
