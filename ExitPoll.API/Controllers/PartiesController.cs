using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using ExitPoll.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PartiesController : ControllerBase
    {
        private readonly IPartyService _PartyService;

        public PartiesController(IPartyService PartyService)
        {
            _PartyService = PartyService;
        }

        // GET: api/<PartiesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var Parties = await _PartyService.GetAllAsync();
            return Ok(Parties);
        }

        // GET api/<PartiesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var City = await _PartyService.GetByIdAsync(id);
            return Ok(City);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Party dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _PartyService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<PartiesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Party dto)
        {
            if (id != dto.Id) return BadRequest();

            await _PartyService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<PartiesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _PartyService.DeleteAsync(id);
            return NoContent();
        }

    }
}
