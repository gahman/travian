using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Travian.Web.API.Models;

[assembly: OwinStartup(typeof(Travian.Web.API.Startup))]

namespace Travian.Web.API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
