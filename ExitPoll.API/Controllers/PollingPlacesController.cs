using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PollingPlacesController : ControllerBase
    {
        private readonly IPollingPlaceService _PollingPlaceService;

        public PollingPlacesController(IPollingPlaceService pollingPlaceService)
        {
            _PollingPlaceService = pollingPlaceService;
        }

        // GET: api/<ProjectsController>
        [HttpGet]
        [Authorize(Roles = "Admin,Agent")]
        public async Task<IActionResult> Get()
        {
            var pollingPlaces = await _PollingPlaceService.GetAllAsync();
            return Ok(pollingPlaces);
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Agent")]
        public async Task<IActionResult> Get(int id)
        {
            var pollingPlaces = await _PollingPlaceService.GetByIdAsync(id);
            return Ok(pollingPlaces);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromBody] PollingPlaceDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _PollingPlaceService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<ProjectsController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(int id, [FromBody] PollingPlaceDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _PollingPlaceService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<ProjectsController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _PollingPlaceService.DeleteAsync(id);
            return NoContent();
        }

    }
}
