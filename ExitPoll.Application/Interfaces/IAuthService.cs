using ExitPoll.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExitPoll.Application.Interfaces
{
    public interface IAuthService
    {
        Task<List<UserDto>> GetUsersAsync(string sort);
        Task<UserDto?> GetUserByIdAsync(int id);
        Task CreateUserAsync(CreateUserDto dto);
        Task UpdateUserAsync(int id, CreateUserDto dto);
        Task DeleteUserAsync(int id);
        Task<string?> AuthenticateAsync(LoginDto dto);
    }

}
