using System.ComponentModel.DataAnnotations;

namespace ExitPoll.Models
{
    public class Project
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime StartDate{ get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public int StateId { get; set; }
        public State State { get; set; }



    }
}
