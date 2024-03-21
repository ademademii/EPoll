using ExitPoll.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PollingPlacesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public PollingPlacesController(ApplicationDbContext db)
        {
            _db = db;
        }
        // GET: api/<PollingPlacesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PollingPlacesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PollingPlacesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PollingPlacesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PollingPlacesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
