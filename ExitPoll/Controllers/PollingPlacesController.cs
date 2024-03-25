using ExitPoll.Data;
using ExitPoll.Migrations;
using ExitPoll.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExitPoll.Models.ViewModels;
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
        public async Task<IActionResult> Get(string sort="desc")
        {
            IQueryable<PollingPlace> pollingPlaces;
            
            switch(sort)
            {
                case "desc":
                    pollingPlaces = _db.PollingPlaces.OrderByDescending(p=>p.Id);
                    break;
                case "asc":
                    pollingPlaces = _db.PollingPlaces.OrderBy(p=>p.Id);
                    break;
                    default:
                    pollingPlaces = _db.PollingPlaces;
                    break;
            }

            return Ok(pollingPlaces);
        }

        // GET api/<PollingPlacesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var pollingPlace = await _db.PollingPlaces.FindAsync(id);
            if (pollingPlace == null)
            {
                return BadRequest("No PollingPlace with this id");
            }
            return Ok(pollingPlace);
        }

        // POST api/<PollingPlacesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PollingPlaceViewModel pollingPlaceVM)
        {
            if(ModelState.IsValid)
            {
                var pollingPlace = new PollingPlace
                {
                    Name = pollingPlaceVM.Name,
                    Address = pollingPlaceVM.Address,
                    Population = pollingPlaceVM.Population,
                    OpeningTime = pollingPlaceVM.OpeningTime,
                    CloseingTime = pollingPlaceVM.CloseingTime,
                    CityId = pollingPlaceVM.CityId

                };
                _db.PollingPlaces.Add(pollingPlace);
                await _db.SaveChangesAsync();
                return Ok("PollingPlace created successfylly...");
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/<PollingPlacesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PollingPlaceViewModel pollingPlaceVM)
        {
            var pollingPlace = await _db.PollingPlaces.FindAsync(id);
            if (ModelState.IsValid)
            {
                pollingPlace.Name=pollingPlaceVM.Name;
                pollingPlace.Address=pollingPlaceVM.Address;
                pollingPlace.Population = pollingPlaceVM.Population;
                pollingPlace.OpeningTime = pollingPlaceVM.OpeningTime;
                pollingPlace.CloseingTime=pollingPlaceVM.CloseingTime;
                pollingPlace.CityId = pollingPlaceVM.CityId;
                await _db.SaveChangesAsync();
                return Ok("PollingPlace updated successfully...");
            }
            return BadRequest(ModelState);

        }

        // DELETE api/<PollingPlacesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pollingPlace = await _db.PollingPlaces.FindAsync(id);

            if(pollingPlace == null)
            {
                return BadRequest("Unsuccessfully delete request...");
            }
            
                _db.Remove(pollingPlace);
                await _db.SaveChangesAsync();
                return Ok("Deleted successfully...");
        }
    }
}
