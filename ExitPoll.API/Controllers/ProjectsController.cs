using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _ProjectService;

        public ProjectsController(IProjectService ProjectService)
        {
            _ProjectService = ProjectService;
        }

        // GET: api/<ProjectsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var Projects = await _ProjectService.GetAllAsync();
            return Ok(Projects);
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var Project = await _ProjectService.GetByIdAsync(id);
            return Ok(Project);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProjectDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var id = await _ProjectService.CreateAsync(dto);

            return CreatedAtAction(nameof(Get), new { id }, id);
        }



        // PUT api/<ProjectsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProjectDto dto)
        {
            if (id != dto.Id) return BadRequest();

            await _ProjectService.UpdateAsync(dto);
            return NoContent();
        }


        // DELETE api/<ProjectsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _ProjectService.DeleteAsync(id);
            return NoContent();
        }

    }
}
