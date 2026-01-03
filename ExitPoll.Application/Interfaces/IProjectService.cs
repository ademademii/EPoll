using ExitPoll.Application.DTOs;


namespace ExitPoll.Application.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllAsync();
        Task<ProjectDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(ProjectDto dto);
        Task UpdateAsync(ProjectDto dto);
        Task DeleteAsync(int id);
    }
}
