using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using System.Xml.Linq;
using Travian.Web.API.Utilities;
using Travian.Web.API.Models;
using Newtonsoft.Json;
using System.Xml;

namespace Travian.Web.API.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TravianController : ApiController
    {
        [HttpGet]
        public string Get()
        {
            return "dummy";
        }

        /// <summary>
        /// Get content from travianstats.de as json by id. 
        /// </summary>
        /// <param name="id">The uid of the object to get</param>
        /// <param name="category">Valid categories are: "player", "village", "alliance".</param>
        /// <param name="server">Valid servers are (i.e.): "tx3", "ts19"</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<HttpResponseMessage> GetJsonAsync(int id, string category = "player", string server = "ts19.travian.se", bool force = false)
        {

            string json = "";

            // if force = true, always get updated values from travianstats and update database
            // otherwise: check if id exist in database, it not go to travianstats
            // check if exist in database
            switch (category)
            {
                case "player":
                    using (TravianContext context = new TravianContext())
                    {
                        // if player exist, and not force... get existing
                        // if player exist, and force... get from stats, write over existing
                        // if player not exist, and not force... get from stats, save to db
                        // if player not exist, and force ...    -- " --

                        // disable proxy creation so that we can serialize the retreived object
                        context.Configuration.ProxyCreationEnabled = false;

                        Player existingPlayer = context.Players.Include("Villages").FirstOrDefault(p => p.Uid == id && p.Server == server);

                        if (existingPlayer != null && force == false)
                        {
                            ApiRoot root = new ApiRoot(existingPlayer);
                            string xml = XmlObjects.ConvertClassToXml<ApiRoot>(root);
                            json = Newtonsoft.Json.JsonConvert.SerializeXNode(XElement.Parse(xml));
                        } else if (existingPlayer != null && force == true)
                        {
                            using (HttpClient httpClient = new HttpClient())
                            {
                                string url = string.Format("http://travianstats.de/api-{0}/{1}/{2}.xml", category, server, id);
                                HttpResponseMessage r = await httpClient.GetAsync(url);
                                XElement contentXml = await r.Content.ReadAsAsync<XElement>();

                                if (contentXml.Value == "unknown uid")
                                {
                                    var failResponse = new HttpResponseMessage(HttpStatusCode.NotFound);
                                    failResponse.Content = new StringContent("", Encoding.UTF8, "application/json");
                                    return failResponse;
                                }

                                json = Newtonsoft.Json.JsonConvert.SerializeXNode(contentXml);

                                // update existing player in db
                                ApiRoot root = XmlObjects.ConvertXmlToClass<ApiRoot>(contentXml.ToString());
                                existingPlayer.Update(context, root);
                                
                                context.SaveChanges();
                            }

                        }
                        else // if player not exist... get from stats and save to db
                        {
                            using (HttpClient httpClient = new HttpClient())
                            {
                                string url = string.Format("http://travianstats.de/api-{0}/{1}/{2}.xml", category, server, id);
                                HttpResponseMessage r = await httpClient.GetAsync(url);
                                XElement contentXml = await r.Content.ReadAsAsync<XElement>();

                                if (contentXml.Value == "unknown uid")
                                {
                                    var failResponse = new HttpResponseMessage(HttpStatusCode.NotFound);
                                    failResponse.Content = new StringContent("", Encoding.UTF8, "application/json");
                                    return failResponse;
                                }

                                json = Newtonsoft.Json.JsonConvert.SerializeXNode(contentXml);

                                // save new player to db
                                ApiRoot root = XmlObjects.ConvertXmlToClass<ApiRoot>(contentXml.ToString());
                                Player player = root.Player;
                                player.Villages = root.Villages;

                                context.Players.Add(player);
                                context.SaveChanges();
                            }
                        }
                    }
                    break;
                case "village":
                    break;
                case "alliance":
                    break;
                default:
                    break;
            }


            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return response;
        }
    }
}