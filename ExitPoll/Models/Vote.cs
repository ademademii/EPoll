using System.ComponentModel.DataAnnotations.Schema;

namespace ExitPoll.Models
{
    public class Vote
    {
        public int Id { get; set; }

        public int VoterId { get; set; }
        public Voter Voter { get; set; }
        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }
        
    }
}
