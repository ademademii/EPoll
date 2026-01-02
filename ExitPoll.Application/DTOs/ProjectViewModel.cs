using System.ComponentModel.DataAnnotations;

namespace ExitPoll.Models.ViewModels
{
    public class ProjectViewModel
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
