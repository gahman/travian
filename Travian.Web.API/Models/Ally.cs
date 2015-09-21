using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travian.Web.API.Models
{
    public class Ally
    {
        public Guid Id { get; set; }
        public int Uid { get; set; }
        public List<Player> Players { get; set; }
        public string Name { get; set; }
    }
}