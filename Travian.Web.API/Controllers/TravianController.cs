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

namespace Travian.Web.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        public async Task<HttpResponseMessage> GetJsonAsync(int id, string category = "player", string server = "ts19")
        {
            using (HttpClient httpClient = new HttpClient())
            {
                string url = string.Format("http://travianstats.de/api-{0}/{1}.travian.se/{2}.xml", category, server, id);
                HttpResponseMessage r = await httpClient.GetAsync(url);
                var contentXml = await r.Content.ReadAsAsync<XElement>();

                //string path = string.Format("{0}Data/{1}_{2}_{3}.xml", HttpRuntime.AppDomainAppPath, category, "tx3", "2403");
                //var contentXml = XDocument.Load(path);

                string json = Newtonsoft.Json.JsonConvert.SerializeXNode(contentXml);
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StringContent(json, Encoding.UTF8, "application/json");
                return response;
            }
        }
    }
}