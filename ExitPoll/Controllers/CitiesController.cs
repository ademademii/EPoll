using ExitPoll.Data;
using ExitPoll.Models;
using ExitPoll.Models.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.Controllers
{
   

    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public CitiesController(ApplicationDbContext db)
        {
            _db=db;
        }


        // GET: api/<CitiesController>
        [HttpGet]
        public async Task<IActionResult> Get(string sort="asc")
        {
            IQueryable<City> cities;
            switch (sort)
            {
                case "desc":
                    cities = _db.Cities.OrderByDescending(x => x.Id);
                    break;
                case "asc":
                    cities = _db.Cities.OrderBy(x => x.Id);
                    break;
                default:
                    cities = _db.Cities;
                    break;
            }
            return Ok(cities);
        }

        // GET api/<CitiesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var city = await _db.Cities.FindAsync(id);

            if(city == null)
            {
                return BadRequest("This object does not exist in the database...");
            }    

            return Ok(city);
        }

        [HttpGet]
        [Route("PagingCities/{page=}/{pageSize=}")]

        public async Task<IActionResult> PagingCities(int page, int pageSize)
        {
            var cities = await _db.Cities.ToListAsync();
            return Ok(cities.Skip((page-1)*pageSize).Take(pageSize));

        }

        [HttpGet]
        [Route("Search/{search=}")]
        public async Task<IActionResult> Search(string search)
        {
            IQueryable<City> cities = _db.Cities.Where(x=>x.Name.Contains(search));
            return Ok(cities);
        }


        // POST api/<CitiesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CityViewModel cityViewModel)
        {
            if(ModelState.IsValid)
            {
                var city = new City
                {
                    Name = cityViewModel.Name,
                    Descriptions = cityViewModel.Descriptions,
                    Population = cityViewModel.Population,
                    ZipCode = cityViewModel.ZipCode,
                    Area = cityViewModel.Area,
                    StateId = cityViewModel.StateId

                };
                _db.Cities.Add(city);
                await _db.SaveChangesAsync();
                return Ok("Created successfully...");
            }
            else
            {
                return BadRequest("Creation failed. Please check the data and try again...");
            }
        }

        // PUT api/<CitiesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CityViewModel cityVM)
        {
            var entity = await _db.Cities.FindAsync(id);

            if(ModelState.IsValid)
            {
                entity.Name=cityVM.Name;
                entity.Descriptions = cityVM.Descriptions;
                entity.Population = cityVM.Population;
                entity.ZipCode = cityVM.ZipCode;
                entity.Area = cityVM.Area; 
                entity.StateId = cityVM.StateId;
                _db.Cities.Update(entity);
                await _db.SaveChangesAsync();
                return Ok("Updated successfully...");
            }
            else
            {
                return BadRequest("Update failed. Please check the data and try again...");
            }
        }

        // DELETE api/<CitiesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var city = await _db.Cities.FindAsync(id);
            if(city == null)
            {
                return BadRequest("No records found to delete...");
            }
            _db.Cities.Remove(city);
            await _db.SaveChangesAsync();
            return Ok("Deleted successfully...");

        }
    }
}
