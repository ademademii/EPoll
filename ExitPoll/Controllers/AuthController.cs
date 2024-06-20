using ExitPoll.Data;
using ExitPoll.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ExitPoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _db = context;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(string sort = "asc")
        {
            IQueryable<User> users;
            switch (sort)
            {
                case "desc":
                    users = _db.Users.OrderByDescending(x => x.Id);
                    break;
                case "asc":
                    users = _db.Users.OrderBy(x => x.Id);
                    break;
                default:
                    users = _db.Users;
                    break;
            }
            return Ok(users);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _db.Users.FindAsync(id);

            if (user == null)
            {
                return BadRequest("This object does not exist in the database...");
            }

            return Ok(user);


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            var entity = await _db.Users.FindAsync(id);

            if (ModelState.IsValid)
            {
                entity.Name= user.Name;
                entity.Surname= user.Surname;
                entity.UserName= user.UserName;
                entity.Password = HashPassword(user.Password);
                entity.Email= user.Email;
                entity.Role = user.Role;

                _db.Users.Update(entity);
                await _db.SaveChangesAsync();
                return Ok("Updated successfully...");
            }
            else
            {
                return BadRequest("Update failed. Please check the data and try again...");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest("No records found to delete...");
            }
            else
            {
                _db.Users.Remove(user);
                await _db.SaveChangesAsync();
                return Ok("Deleted successfully...");
            }
         
        }

        [HttpPost("Authenticate")]
        public IActionResult CreateToken([FromBody] LoginModel login)
        {
            var user = Authenticate(login.UserName, login.Password);

            if (user != null)
            {
                var tokenString = GenerateJwtToken(user);
                return Ok(new { Token = tokenString });
            }

            return Unauthorized();
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        [HttpPost("Createuser")]
        public async Task<IActionResult> CreateUser([FromBody] User createUserModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // You may want to add more validation here if needed

            // Check if the username is already taken
            if (_db.Users.Any(u => u.UserName == createUserModel.UserName))
            {
                return BadRequest("Username is already taken");
            }

            // Create a new User object
            var newUser = new User
            {
                Name= createUserModel.Name,
                Surname=createUserModel.Surname,
                UserName = createUserModel.UserName,
                Password = HashPassword(createUserModel.Password),
                Email = createUserModel.Email,// Hash the password before saving (implement HashPassword method)
                Role = createUserModel.Role // Example role assignment
                // Add other properties as needed
            };

            try
            {
                _db.Users.Add(newUser);
                await _db.SaveChangesAsync();
                return Ok("User created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating user: {ex.Message}");
            }
        }

        private User Authenticate(string username, string password)
        {
            // Find user by username
            var user = _db.Users.SingleOrDefault(u => u.UserName == username);

            // Check if user exists and password is correct (verify hashed password)
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user; // Authentication successful
            }

            return null; // Authentication failed
        }

        private string GenerateJwtToken(User user)
        {
            var secretKey = _configuration["Jwt:SecretKey"];
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            // Check if any of the required configuration values are missing
            if (string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience))
            {
                throw new InvalidOperationException("JWT configuration is invalid or incomplete.");
                // or return an error response if throwing is not desired in this context
                // return StatusCode(StatusCodes.Status500InternalServerError, "JWT configuration is invalid or incomplete.");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.Role, user.Role)
        // You can add more claims here if needed
    };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // Token expiration time
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


       



    }
}
