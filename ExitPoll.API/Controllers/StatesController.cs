using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        // GET: api/<StatesController>
        [HttpGet]
        [Authorize(Roles = "Admin,Agent")]
        public async Task<IActionResult> Get()
        {
            var states = await _stateService.GetAllAsync();
            return Ok(states);
        }

        // GET api/<StatesController>/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Agent")]
        public async Task<IActionResult> Get(int id)
        {
            var state = await _stateService.GetByIdAsync(id);
            return Ok(state);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromBody] StateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _stateService.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<StatesController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(int id, [FromBody] StateDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _stateService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<StatesController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _stateService.DeleteAsync(id);
            return NoContent();
        }

    }
}
