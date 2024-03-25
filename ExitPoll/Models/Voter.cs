﻿using System.ComponentModel.DataAnnotations.Schema;

namespace ExitPoll.Models
{
    public class Voter
    {
        public int Id { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public int PollingPlaceId { get; set; }
        public PollingPlace PollingPlace { get; set; }

    }
}
