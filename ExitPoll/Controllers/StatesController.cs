using ExitPoll.Data;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public StatesController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/<StatesController>
        [HttpGet]
        public IActionResult Get()
        {
            var states = _db.States;
            return Ok(states);
        }

        // GET api/<StatesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        [EnableCors("AllowOrigin")]
        // POST api/<StatesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StateViewModel stateViewModel)
        {
            if (ModelState.IsValid)
            {
                var state = new State
                {
                    Name = stateViewModel.Name,
                    Population = stateViewModel.Population
                };
                _db.States.Add(state);
                await _db.SaveChangesAsync();
                return Ok("Created");  
            }
            else
            {
                return BadRequest("Nuk u krijua");
            }

           
        }

        // PUT api/<StatesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StatesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
