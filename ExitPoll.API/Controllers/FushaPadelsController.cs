using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using ExitPoll.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FushaPadelsController : ControllerBase
    {
        private readonly IFushaPadelService _FushaPadelService;

        public FushaPadelsController(IFushaPadelService FushaPadelService)
        {
            _FushaPadelService = FushaPadelService;
        }

        // GET: api/<FushaPadelsController>
        [HttpGet]
        [Authorize(Roles = "Admin,Agent")]
        public async Task<IActionResult> Get()
        {
            var FushaPadels = await _FushaPadelService.GetAllAsync();
            return Ok(FushaPadels);
        }

        // GET api/<FushaPadelsController>/5
        [Authorize(Roles = "Admin,Agent")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var fushaPadel = await _FushaPadelService.GetByIdAsync(id);
            return Ok(fushaPadel);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post([FromBody] FushaPadelDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _FushaPadelService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<FushaPadelsController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(int id, [FromBody] FushaPadelDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _FushaPadelService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<FushaPadelsController>/5

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _FushaPadelService.DeleteAsync(id);
            return NoContent();
        }

    }
}
