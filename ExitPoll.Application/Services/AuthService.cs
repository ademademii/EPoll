using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService : IAuthService
{
    private readonly IUserRepository _repo;
    private readonly IConfiguration _config;

    public AuthService(IUserRepository repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    public async Task<List<UserDto>> GetUsersAsync(string sort)
    {
        var users = await _repo.GetAllAsync(sort);
        return users.Select(MapToDto).ToList();
    }

    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        return user == null ? null : MapToDto(user);
    }

    public async Task CreateUserAsync(CreateUserDto dto)
    {
        if (await _repo.UsernameExistsAsync(dto.UserName))
            throw new Exception("Username already taken");

        var user = new User
        {
            Name = dto.Name,
            Surname = dto.Surname,
            UserName = dto.UserName,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Email = dto.Email,
            ProjectId = dto.ProjectId,
            Role = dto.Role
        };

        await _repo.AddAsync(user);
        await _repo.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(int id, CreateUserDto dto)
    {
        var user = await _repo.GetByIdAsync(id)
            ?? throw new Exception("User not found");

        user.Name = dto.Name;
        user.Surname = dto.Surname;
        user.UserName = dto.UserName;
        user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        user.Email = dto.Email;
        user.ProjectId = dto.ProjectId;
        user.Role = dto.Role;

        await _repo.UpdateAsync(user);
        await _repo.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id)
            ?? throw new Exception("User not found");

        await _repo.DeleteAsync(user);
        await _repo.SaveChangesAsync();
    }

    public async Task<string?> AuthenticateAsync(LoginDto dto)
    {
        var user = await _repo.GetByUsernameAsync(dto.UserName);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            return null;

        return GenerateJwt(user);
    }

    private string GenerateJwt(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]!));

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("UserId", user.Id.ToString()),
            new Claim("ProjectId", user.ProjectId.ToString())
        };

        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static UserDto MapToDto(User user) => new()
    {
        Id = user.Id,
        Name = user.Name,
        Surname = user.Surname,
        UserName = user.UserName,
        Email = user.Email,
        ProjectId = user.ProjectId,
        Role = user.Role
    };
}
