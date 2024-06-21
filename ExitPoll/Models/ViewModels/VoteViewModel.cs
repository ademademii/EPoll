using System.ComponentModel.DataAnnotations;

namespace ExitPoll.Models.ViewModels
{
    public class VoteViewModel
    {
        public int Id { get; set; }
        public string AgeGroup { get; set; }
        public char Gender { get; set; }
        public int PollingPlaceId {  get; set; }
        public int PartyId { get; set; }
    }
}
