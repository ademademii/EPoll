using ExitPoll.Application.DTOs;
using ExitPoll.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExitPoll.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class ResultsController : ControllerBase
    {
        private readonly IResultsService _resultsService;

        public ResultsController(IResultsService resultsService)
        {
            _resultsService = resultsService;
        }

        [HttpGet("GetVotesAndPartyName")]
        public async Task<IActionResult> GetVotesAndPartyName(string partyName)
        {
            var result = await _resultsService.GetVotesByPartyNameAsync(partyName);
            return Ok(result);
        }

        [HttpGet("GetAllPartiesWithVotesAndPercentage")]
        public async Task<IActionResult> GetAllPartiesWithVotesAndPercentage(
            int projectId,
            string? gender = null,
            string? ageGroup = null)
        {
            var result = await _resultsService
                .GetAllPartiesWithVotesAsync(projectId, gender, ageGroup);

            return Ok(result);
        }

        [HttpGet("GetBasedOnGender")]
        public async Task<IActionResult> GetBasedOnGender(string gender)
        {
            var count = await _resultsService.GetVotesByGenderAsync(gender);
            return Ok(count);
        }

        [HttpGet("GetBasedAgeGroup")]
        public async Task<IActionResult> GetBasedAgeGroup(string ageGroup)
        {
            var count = await _resultsService.GetVotesByAgeGroupAsync(ageGroup);
            return Ok(count);
        }
    }

}
