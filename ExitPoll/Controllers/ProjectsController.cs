using ExitPoll.Data;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public ProjectsController(ApplicationDbContext context) 
        {
            _db = context;
        }

        // GET: api/<ProjectsController>
        [HttpGet]
        public IActionResult Get()
        {
            var projects = _db.Projects;
            return Ok(projects);
        }

        // GET api/<ProjectsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
           var project = _db.Projects.FirstOrDefault(x => x.Id == id);
           return Ok(project);
        }

        // POST api/<ProjectsController>
        [HttpPost]
        
        public async Task<IActionResult> Post([FromBody] ProjectViewModel projectVM)
        {
            if(ModelState.IsValid)
            {
                var project = new Project
                {
                    Name=projectVM.Name,
                    Description= projectVM.Description,
                    StartDate= projectVM.StartDate,
                    EndDate= projectVM.EndDate,
                    Status= projectVM.Status,
                    StateId= projectVM.StateId

                };

                _db.Projects.Add(project);
                await _db.SaveChangesAsync();
                return Ok("Created successfully...");

                
            }
            else
            {
                return BadRequest("Creation failed. Please check the data and try again...");
            }
            
        }

        // PUT api/<ProjectsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProjectViewModel projectVM)
        {
            var entity = _db.Projects.Find(id);
            if (entity == null)
            {
                return BadRequest(ModelState);
            }
            entity.Name = projectVM.Name;
            entity.Description= projectVM.Description;
            entity.StartDate = projectVM.StartDate;
            entity.EndDate = projectVM.EndDate;
            entity.Status = projectVM.Status;
            _db.SaveChanges();
            return Ok("Updated successfully...");

        }

        // DELETE api/<ProjectsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var project = _db.Projects.Find(id);
            if(project == null)
            {
                return NotFound();
            }
            _db.Projects.Remove(project);
            _db.SaveChanges();
            return Ok();
        }
    }
}
