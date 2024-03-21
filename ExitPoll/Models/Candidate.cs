using System.ComponentModel.DataAnnotations.Schema;

namespace ExitPoll.Models
{
    public class Candidate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }

        
    }
}
