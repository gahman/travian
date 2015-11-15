using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travian.Web.API.Controllers;
using Travian.Web.API.Models;
using Travian.Web.API.Tests.Mocks;

namespace Travian.Web.API.Tests.Controllers
{
    [TestClass]
    public class TravianControllerTest
    {
        //[TestMethod]
        //public async Task GetJsonById()
        //{
        //    int id = -1;

        //    var fakePlayers = new List<Player>()
        //    {
        //        new Player() { Name = "testplayer", Uid = -1, Server = "ts19.travian.se", Villages = new List<Village>() }
        //    };

        //    var mockedContext = new Mock<TravianContext>();
        //    mockedContext.Setup(c => c.Players).ReturnsDbSet(fakePlayers);
        //    TravianController controller = new TravianController(mockedContext.Object);

        //    Player p = mockedContext.Object.Players.FirstOrDefault();

        //    var result = await controller.GetJsonAsync(id);
        //    var content = await result.Content.ReadAsStringAsync(); 

        //    Assert.IsNotNull(content.Contains("testplayer"));

        //    //result.Single().Name.Should().Be("George");
        //}

        [TestMethod]
        public async Task GetJsonById_NotExist_ShouldReturnEmptyJson()
        {
            int id = -1;

            var fakePlayers = new List<Player>()
            {
                new Player() { Name = "test", Uid = 1, Villages = new List<Village>() }
            };

            var mockedContext = new Mock<TravianContext>();
            mockedContext.Setup(c => c.Players).ReturnsDbSet(fakePlayers);
            TravianController controller = new TravianController(mockedContext.Object);
            
            var someFile = await controller.GetJsonAsync(id);
            var result = someFile;
            var content = await result.Content.ReadAsStringAsync();

            Assert.IsTrue(content == "{}");
        }


        //[TestMethod]
        //public async Task GetJsonById_ForceFalse_ShouldReturnExisting()
        //{
        //    int id = 2403; // existing player
        //    TravianController controller = new TravianController();

        //    var someFile = await controller.GetJsonAsync(id, "player", "tx3.travian.se", false);
        //    var result = someFile;
        //    var content = await result.Content.ReadAsStringAsync();

        //    Assert.IsTrue(content.Contains("Klurig"));
        //}

    }
}
