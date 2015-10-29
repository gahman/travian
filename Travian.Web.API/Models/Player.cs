using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace Travian.Web.API.Models
{
    [XmlRootAttribute("player", IsNullable = false)]
    public class Player : EntityBase
    {
        //<uid>2403</uid>
        //<name>Klurig</name>
        //<aid>424</aid>
        //<alliance>TF!</alliance>
        //<tribe>3</tribe>
        //<database>setx3</database>
        //<server>tx3.travian.se</server>

        public Player()
        {
        }

        [XmlElement("uid")]
        public int Uid { get; set; }
        [XmlElement("name")]
        public string Name { get; set; }
        [XmlElement("aid")]
        public int AllianceId { get; set; }
        [XmlElement("tribe")]
        public int Tribe { get; set; }

        [XmlIgnore]
        public virtual List<Village> Villages { get; set; } = new List<Village>();

        [XmlIgnore]
        public virtual Ally Ally { get; set; }

        [XmlIgnore]
        public int Inhabitants { get; set; }

        [XmlIgnore]
        public int Rank { get; set; }
        [XmlElement("server")]
        public string Server { get; set; }


        /// <summary>
        /// Update the properties recursive (mapped to root)
        /// </summary>
        /// <param name="root">the new values to update with</param>
        public void Update(TravianContext context, ApiRoot root)
        {
            this.Uid = root.Player.Uid;
            this.Name = root.Player.Name;
            this.AllianceId = root.Player.AllianceId;
            this.Tribe = root.Player.Tribe;
            this.Server = root.Player.Server;

            if (root.Villages != null)
            {
                // remove and replace the villages (they may have been lost or new ones built)
                context.Villages.RemoveRange(this.Villages);
                context.SaveChanges();

                this.Villages = root.Villages;
            }
        }
    }
}