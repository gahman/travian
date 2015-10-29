using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Travian.Web.API.Utilities;

namespace Travian.Web.API.Models
{
    public class TravianInitializer : System.Data.Entity.CreateDatabaseIfNotExists<TravianContext> //.DropCreateDatabaseIfModelChanges<TravianContext>
    {
        protected override void Seed(TravianContext context)
        {
            string xml1 = File.ReadAllText(@"C:\Projects\Travian\Web\Travian.Web\Travian.Web.API\Data\player_tx3_2403.xml");
            Player player1 = XmlObjects.ConvertXmlToPlayer(xml1);
            context.Players.Add(player1);
            context.SaveChanges();

            base.Seed(context);
        }
    }
}