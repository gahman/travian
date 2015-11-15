using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Travian.Web.API.Models
{
    public class TravianContext : DbContext, IDbContext
    {

        public TravianContext() : base("TravianContext")
        {
            Database.SetInitializer<TravianContext>(new TravianInitializer());


            // disable proxy creation so that we can serialize the retreived object
            this.Configuration.ProxyCreationEnabled = false;
        }

        //public TravianContext(string connString) : base(connString)
        //{
        //    Database.SetInitializer<TravianContext>(new TravianInitializer());
        //}
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlCe(@"Data Source=C:\data\Blogging.sdf");
        //}

        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<Ally> Allies { get; set; }
        public virtual DbSet<Village> Villages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}