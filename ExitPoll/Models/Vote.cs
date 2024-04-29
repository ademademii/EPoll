using System.ComponentModel.DataAnnotations.Schema;

namespace ExitPoll.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public string AgeGroup {  get; set; }
        public char Gender { get; set; }
        public int PollingPlaceId { get; set; }
        public PollingPlace PollingPlace { get; set; }

        public int PartyId { get; set; }
        public Party Party { get; set; }
        
    }
}
