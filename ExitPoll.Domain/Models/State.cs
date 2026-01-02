using System.ComponentModel.DataAnnotations.Schema;

namespace ExitPoll.Models
{
    public class State
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Population { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}
