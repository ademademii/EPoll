using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExitPoll.Domain.Entities
{
    public class RezervimiFushes
    {
        public int Id { get; set; }
        public string ?EmriRezervuesit { get; set; }
        public int NrPersonave { get; set; }
        public int FushaPadelId {  get; set; }
        public FushaPadel FushaPadel { get; set; }
    }
}
