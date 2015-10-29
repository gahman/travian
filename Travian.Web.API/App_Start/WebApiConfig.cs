using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Travian.Web.API.Formatters;
using System.Web.Http.Cors;
using Travian.Web.API.Models;

namespace Travian.Web.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            config.EnableCors();

            //var cors = new EnableCorsAttribute(
            //    origins: "*",
            //    headers: "*",
            //    methods: "*");
            //config.EnableCors(cors);

            //config.Formatters.Add(new VillageCsvFormatter());

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var context = new TravianContext();
            context.Database.Initialize(true);
        }
    }
}
