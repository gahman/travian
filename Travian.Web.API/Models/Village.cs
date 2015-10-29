using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace Travian.Web.API.Models
{
    [XmlRootAttribute("data", IsNullable = false)]
    public class Village : EntityBase
    {

        //<did>5260</did>
        //<name>01 Caesars Palace</name>
        //<inhabitants>1076</inhabitants>
        //<coordinates>14|-159</coordinates>

        public Village()
        {
        }

        [XmlElement("did")]
        public int Did { get; set; }

        [XmlElement("name")]
        public string Name { get; set; }

        [XmlElement("inhabitants")]
        public int Inhabitants { get; set; }

        [XmlIgnore]
        public int X { get; set; }

        [XmlIgnore]
        public int Y { get; set; }

        [XmlElement("coordinates")]
        public string Coordinates { get; set; }

        [XmlIgnore]
        public virtual Player Player { get; set; }

        [XmlIgnore]
        public int Tournament { get; set; } = 100;

        [XmlIgnore]
        public int Speed { get; set; } = 6;
    }
}