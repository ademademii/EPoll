using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExitPoll.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers(string sort = "asc")
            => Ok(await _authService.GetUsersAsync(sort));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _authService.GetUserByIdAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpPost("CreateUser")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser(CreateUserDto dto)
        {
            await _authService.CreateUserAsync(dto);
            return Ok("User created successfully");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(int id, CreateUserDto dto)
        {
            await _authService.UpdateUserAsync(id, dto);
            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _authService.DeleteUserAsync(id);
            return Ok("Deleted successfully");
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate(LoginDto dto)
        {
            var token = await _authService.AuthenticateAsync(dto);
            return token == null ? Unauthorized() : Ok(new { Token = token });
        }
    }

}
