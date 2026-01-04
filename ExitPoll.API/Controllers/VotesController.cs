using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Agent")]
    public class VotesController : ControllerBase
    {
        private readonly IVoteService _VoteService;

        public VotesController(IVoteService voteService)
        {
            _VoteService = voteService;
        }

        // GET: api/<ProjectsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var pollingPlaces = await _VoteService.GetAllAsync();
            return Ok(pollingPlaces);
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var pollingPlaces = await _VoteService.GetByIdAsync(id);
            return Ok(pollingPlaces);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VoteDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _VoteService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<ProjectsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] VoteDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _VoteService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<ProjectsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _VoteService.DeleteAsync(id);
            return NoContent();
        }

    }
}
