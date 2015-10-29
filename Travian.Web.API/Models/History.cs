using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace Travian.Web.API.Models
{
    public class History
    {

   //     			<date>2015-09-16</date>
			//<rank>7</rank>
			//<villages>43</villages>
			//<inhabitants>38168</inhabitants>

        public Guid Id { get; set; }

        [XmlElement("date")]
        public DateTime Date { get; set; }

        [XmlElement("rank")]
        public int Rank { get; set; }

        [XmlElement("villages")]
        public int Villages { get; set; }
        
        [XmlElement("inhabitants")]
        public int Inhabitants { get; set; }
    }
}