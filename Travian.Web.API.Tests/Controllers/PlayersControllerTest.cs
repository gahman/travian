using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Travian.Web.API;
using Travian.Web.API.Controllers;
using System.Threading.Tasks;

namespace Travian.Web.API.Tests.Controllers
{
    [TestClass]
    public class PlayersControllerTest
    {
        /// <summary>
        /// PlayersController return 'some' file if passed the id 2521
        /// </summary>
        //[TestMethod]
        //public async Task GetCsvById()
        //{
        //    int id = 2521;
        //    PlayersController controller = new PlayersController();

        //    Task<HttpResponseMessage> someFile = controller.GetCsvAsync(id);

        //    var result = await someFile;
        //    Assert.IsNotNull(result.Content);
        //}

        [TestMethod]
        public async Task GetJsonById()
        {
            int id = 2403;
            TravianController controller = new TravianController();

            var someFile = await controller.GetJsonAsync(id);
            var result = someFile;
            var content = await result.Content.ReadAsStringAsync(); 

            Assert.IsNotNull(result.Content);
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
