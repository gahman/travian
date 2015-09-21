using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travian.Web.API.Models
{
    public class Village
    {
        public Guid Id { get; set; }

        // the id used by travian
        public int Uid { get; set; }

        public string Name { get; set; }

        public int Population { get; set; }

        public int X { get; set; }
        public int Y { get; set; }

        public virtual Player Player { get; set; }

        public int Tournament { get; set; }
    }
}