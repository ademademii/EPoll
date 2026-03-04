using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using ExitPoll.Domain.Entities;
using ExitPoll.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExitPoll.Application.Services
{
    public class MjekuSpecialistService : IMjekuSpecialistService
    {
        private readonly IMjekuSpecialistRepository _repository;

        public MjekuSpecialistService(IMjekuSpecialistRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MjekuSpecialistDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(e => new MjekuSpecialistDto
            {
                Id = e.Id,
                EmriMjekut = e.EmriMjekut,
                Specialiteti = e.Specialiteti,
            });
        }

        public async Task<MjekuSpecialistDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;

            return new MjekuSpecialistDto
            {
                Id = entity.Id,
                EmriMjekut = entity.EmriMjekut,
                Specialiteti = entity.Specialiteti,
            };
        }

        public async Task<int> CreateAsync(MjekuSpecialistDto dto)
        {
            var entity = new MjekuSpecialist
            {
                EmriMjekut = dto.EmriMjekut,
                Specialiteti = dto.Specialiteti,
            };

            await _repository.AddAsync(entity);
            return entity.Id;
        }

        public async Task UpdateAsync(MjekuSpecialistDto dto)
        {
            var entity = new MjekuSpecialist
            {
                Id = dto.Id,
                EmriMjekut = dto.EmriMjekut,
                Specialiteti = dto.Specialiteti,
            };

            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
