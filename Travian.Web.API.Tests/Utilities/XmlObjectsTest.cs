using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Travian.Web.API;
using Travian.Web.API.Utilities;
using Travian.Web.API.Models;
using System.Threading.Tasks;
using System.IO;

namespace Travian.Web.API.Tests.Utilities
{
    [TestClass]
    public class XmlObjectsTest
    {

        [TestMethod]
        public void XmlObjects_ConvertXmlToClass_ShouldSerializeObject()
        {
            string xml = File.ReadAllText(@"C:\Projects\Travian\Web\Travian.Web\Travian.Web.API\Data\player_tx3_2403.xml");
            ApiRoot api = new ApiRoot();

            api = XmlObjects.ConvertXmlToClass<ApiRoot>(xml);

            Assert.IsNotNull(api.Player);
            Assert.IsInstanceOfType(api.Player, typeof(Player));
        }

        [TestMethod]
        public void XmlObjects_ConvertClassToXml_PlayerShouldReturnValidXml()
        {
            Player player = new Player();
            player.Name = "Goran";
            player.Server = "ts19.travian.se";

            Village v1 = new Village();
            v1.Name = "village 1";
            v1.Player = player;
            v1.Inhabitants = 100;

            player.Villages = new List<Village>();
            player.Villages.Add(v1);

            string xml = XmlObjects.ConvertClassToXml<Player>(player);

            Assert.IsTrue(xml.Contains("<api"));
        }

        [TestMethod]
        public void XmlObjects_ConvertXmlToPlayer_ShouldSerializePlayerWithVillages()
        {
            string xml = File.ReadAllText(@"C:\Projects\Travian\Web\Travian.Web\Travian.Web.API\Data\player_tx3_2403.xml");

            Player player = XmlObjects.ConvertXmlToPlayer(xml);

            Assert.IsFalse(string.IsNullOrEmpty(player.Name));
            Assert.IsTrue(player.Villages.Count > 1);
        }
    }
}
