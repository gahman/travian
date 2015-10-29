using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Travian.Web.API.Models
{
    public class TravianContext : DbContext
    {

        public TravianContext() : base("TravianContext")
        {
            Database.SetInitializer<TravianContext>(new TravianInitializer());

        }

        public TravianContext(string connString) : base(connString)
        {
            Database.SetInitializer<TravianContext>(new TravianInitializer());
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlCe(@"Data Source=C:\data\Blogging.sdf");
        //}

        public DbSet<Player> Players { get; set; }
        public DbSet<Ally> Allies { get; set; }
        public DbSet<Village> Villages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}