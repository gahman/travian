using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.Linq;
using Travian.Web.API.Models;
using Travian.Web.API.Utilities;

namespace Travian.Web.API.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TravianController : ApiController
    {
        private readonly IDbContext _context;

        public TravianController(IDbContext context)
        {
            this._context = context;
        }


        [HttpGet]
        public string Get()
        {
            return "dummy";
        }

        [Route("Mine")]
        public async Task<HttpResponseMessage> MinePlayers(int fromId, int toId, string server = "ts19.travian.se")
        {
            HttpResponseMessage response;
            int nrOfhits = 0;
            List<Task<HttpResponseMessage>> taskList = new List<Task<HttpResponseMessage>>();

            try
            {
                List<Player> replies = new List<Player>();
                for (var i = fromId; i <= toId; ++i)
                {
                    taskList.Add(this.GetJsonAsync(i, server, true));
                }
                var responses = await Task.WhenAll(taskList);
                foreach (var r in responses)
                {
                    if (r.IsSuccessStatusCode) nrOfhits++;
                }

                response = new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            string json = $"{{ fromId: {fromId}, toId: {toId}, hits: {nrOfhits} }}";
            
            response.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return response;
        }

        /// <summary>
        /// Get content from travianstats.de as json by id. 
        /// </summary>
        /// <param name="id">The uid of the object to get</param>
        /// <param name="category">Valid categories are: "player", "village", "alliance".</param>
        /// <param name="server">Valid servers are (i.e.): "tx3", "ts19"</param>
        /// <returns></returns>
        //[Route("Player")]
        public async Task<HttpResponseMessage> GetJsonAsync(int id, string server = "ts19.travian.se", bool force = false)
        {
            string json = "{}";
            var response = new HttpResponseMessage(HttpStatusCode.OK);

            // if force = true, always get updated values from travianstats and update database
            // otherwise: check if id exist in database, it not go to travianstats
            // check if exist in database
            // if player exist, and not force... get existing
            // if player exist, and force... get from stats, write over existing
            // if player not exist, and not force... get from stats, save to db
            // if player not exist, and force ...    -- " --


            Player existingPlayer = _context.Players?.Include("Villages")?.FirstOrDefault(p => p.Uid == id && p.Server == server);

            if (existingPlayer != null && force == false)
            {
                ApiRoot root = new ApiRoot(existingPlayer);
                string xml = XmlObjects.ConvertClassToXml<ApiRoot>(root);
                json = Newtonsoft.Json.JsonConvert.SerializeXNode(XElement.Parse(xml));
            }
            else if (existingPlayer != null && force == true)
            {
                XElement xml = await GetPlayerXml(id, server);

                if (xml != null)
                {
                    // update existing player in db
                    json = Newtonsoft.Json.JsonConvert.SerializeXNode(xml);
                    ApiRoot root = XmlObjects.ConvertXmlToClass<ApiRoot>(xml.ToString());
                    existingPlayer.Update(_context, root);

                    _context.SaveChanges();
                }
                else
                {
                    response = new HttpResponseMessage(HttpStatusCode.NotFound);
                }

            }
            else // if player not exist... get from stats and save to db
            {
                XElement xml = await GetPlayerXml(id, server);

                if (xml != null)
                {
                    json = Newtonsoft.Json.JsonConvert.SerializeXNode(xml);

                    // save new player to db
                    ApiRoot root = XmlObjects.ConvertXmlToClass<ApiRoot>(xml.ToString());
                    Player player = root.Player;
                    player.Villages = root.Villages;

                    _context.Players.Add(player);
                    _context.SaveChanges();
                }
                else
                {
                    response = new HttpResponseMessage(HttpStatusCode.NotFound);
                }
            }

            response.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return response;
        }


        private async Task<XElement> GetPlayerXml(int id, string server)
        {
            XElement contentXml;

            using (HttpClient httpClient = new HttpClient())
            {
                string url = string.Format("http://travianstats.de/api-{0}/{1}/{2}.xml", "player", server, id);
                HttpResponseMessage r = await httpClient.GetAsync(url);
                contentXml = await r.Content.ReadAsAsync<XElement>();

                if (contentXml.Value == "unknown uid")
                {
                    contentXml = null;
                }
            }

            return contentXml;
        }
    }
}