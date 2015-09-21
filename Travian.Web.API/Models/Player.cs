using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travian.Web.API.Models
{
    public class Player
    {
        public Guid Id { get; set; }
        public int Uid { get; set; }
        public string Name { get; set; }
        public List<Village> Villages { get; set; }
        public int Population { get; set; }
        public int Rank { get; set; }
    }
}