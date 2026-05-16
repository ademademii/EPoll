using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using ExitPoll.Application.Services;
using ExitPoll.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RezervimiFushesController : ControllerBase
    {
        private readonly IRezervimiFushesService _RezervimiFushesService;

        public RezervimiFushesController(IRezervimiFushesService RezervimiFushesService)
        {
            _RezervimiFushesService = RezervimiFushesService;
        }

        // GET: api/<FushaPadelsController>
        [HttpGet]
        //[Authorize(Roles = "Admin,Agent")]
        public async Task<IActionResult> Get()
        {
            var rezervimiFushes = await _RezervimiFushesService.GetAllAsync();
            return Ok(rezervimiFushes);
        }

        // GET api/<FushaPadelsController>/5
        //[Authorize(Roles = "Admin,Agent")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var rezervimiFushes = await _RezervimiFushesService.GetByIdAsync(id);
            return Ok(rezervimiFushes);
        }


        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromBody] RezervimiFushesDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _RezervimiFushesService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<FushaPadelsController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(int id, [FromBody] RezervimiFushesDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _RezervimiFushesService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<FushaPadelsController>/5

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _RezervimiFushesService.DeleteAsync(id);
            return NoContent();
        }

    }
}
