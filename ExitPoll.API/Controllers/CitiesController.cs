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
    public class CitysController : ControllerBase
    {
        private readonly ICityService _CityService;

        public CitysController(ICityService CityService)
        {
            _CityService = CityService;
        }

        // GET: api/<CitysController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var Citys = await _CityService.GetAllAsync();
            return Ok(Citys);
        }

        // GET api/<CitysController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var City = await _CityService.GetByIdAsync(id);
            return Ok(City);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CityDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _CityService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<CitysController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CityDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _CityService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<CitysController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _CityService.DeleteAsync(id);
            return NoContent();
        }

    }
}
