using ExitPoll.Data;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

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
        public async Task<IActionResult> Get(int id)
        {
            var state = await _db.States.FindAsync(id);
            return Ok(state);
        }


        [EnableCors("AllowOrigin")]
        [Authorize(Policy = "AdminPolicy")]        // POST api/<StatesController>
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
                return BadRequest("Has not been created");
            }

           
        }

        

        // PUT api/<StatesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] StateViewModel stateViewModel)
        {
            var stateId = await _db.States.FindAsync(id);
            if (ModelState.IsValid)
            {
                stateId.Name = stateViewModel.Name;
                stateId.Population = stateViewModel.Population; 
                _db.States.Update(stateId);
                await _db.SaveChangesAsync();
                return Ok("Update sucessfully...");

            }
            else
            {
                return BadRequest(ModelState);   
            }

        }

        // DELETE api/<StatesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var state = await _db.States.FindAsync(id);
            if(state == null)
            {
                return BadRequest("State doesn't exists or been delted...");
            }
            _db.States.Remove(state);
            await _db.SaveChangesAsync();
            return Ok("State deleted successfully...");
        }
    }
}
