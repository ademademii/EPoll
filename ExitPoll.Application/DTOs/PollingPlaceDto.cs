namespace ExitPoll.Application.DTOs
{
    public class PollingPlaceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int Population { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime CloseingTime { get; set; }
        public int CityId { get; set; }

    }
}
