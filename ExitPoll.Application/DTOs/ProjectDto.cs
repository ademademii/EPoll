using System.ComponentModel.DataAnnotations;

namespace ExitPoll.Application.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public int StateId { get; set; }
    }
}
