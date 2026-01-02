using System.ComponentModel.DataAnnotations.Schema;

namespace ExitPoll.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Descriptions { get; set; }
        public int Population { get; set; }
        public int ZipCode { get; set; }
        public string Area { get; set; }

        public int StateId { get; set; }
        public State State { get; set; }
    }
}
