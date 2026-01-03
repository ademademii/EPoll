using ExitPoll.Application.DTOs;
using ExitPoll.Domain.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Application.Interfaces;

namespace ExitPoll.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _repository;

        public ProjectService(IProjectRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProjectDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new ProjectDto
            {
                Id= e.Id,
                Name= e.Name,
                Description = e.Description,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                Status = e.Status,
                StateId = e.StateId
            });
        }

        public async Task<ProjectDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new ProjectDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Status = entity.Status,
                StateId = entity.StateId
            };
        }


        public async Task<int> CreateAsync(ProjectDto dto)
        {
            var entity = new Project
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = dto.Status,
                StateId = dto.StateId
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }


        public async Task UpdateAsync(ProjectDto dto)
        {
            var entity = new Project
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Status = dto.Status,
                StateId = dto.StateId
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }


    }
}
