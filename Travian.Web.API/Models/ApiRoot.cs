using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace Travian.Web.API.Models
{
    [XmlRootAttribute("api", IsNullable = false)]
    public class ApiRoot : EntityBase
    {
        public ApiRoot()
        {
        }

        public ApiRoot(Player player)
            : base()
        {
            this.Player = player;
            this.Villages = player.Villages;
        }

        [XmlElement("player")]
        public virtual Player Player { get; set; }

        [XmlArray("villages"), XmlArrayItem("data")]
        public virtual List<Village> Villages { get; set; } = new List<Village>();

        [XmlArray("history"), XmlArrayItem("data")]
        public virtual List<History> Histories { get; set; } = new List<History>();
    }
}