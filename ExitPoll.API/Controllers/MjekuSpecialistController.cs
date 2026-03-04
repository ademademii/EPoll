using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MjekuSpecialistController : ControllerBase
    {
        private readonly IMjekuSpecialistService _MjekuSpecialistService;

        public MjekuSpecialistController(IMjekuSpecialistService MjekuSpecialistService)
        {
            _MjekuSpecialistService = MjekuSpecialistService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Agent")]
        public async Task<IActionResult> Get()
        {
            var Mjeket = await _MjekuSpecialistService.GetAllAsync();
            return Ok(Mjeket);
        }

        [Authorize(Roles = "Admin,Agent")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var MjekuSpecialist = await _MjekuSpecialistService.GetByIdAsync(id);
            return Ok(MjekuSpecialist);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromBody] MjekuSpecialistDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _MjekuSpecialistService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(int id, [FromBody] MjekuSpecialistDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _MjekuSpecialistService.UpdateAsync(dto);
            return NoContent();
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _MjekuSpecialistService.DeleteAsync(id);
            return NoContent();
        }

    }
}
