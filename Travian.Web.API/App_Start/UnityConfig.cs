using Microsoft.Practices.Unity;
using System.Data.Entity;
using System.Web.Http;
using Travian.Web.API.Models;
using Unity.WebApi;

namespace Travian.Web.API
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container
                //.RegisterType<IBlahRepository, BlahRepository>()
                .RegisterType<IDbContext, TravianContext>(new HierarchicalLifetimeManager());

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}