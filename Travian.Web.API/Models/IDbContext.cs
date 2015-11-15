using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Travian.Web.API.Models
{
    public interface IDbContext
    {
        //IDbSet<TEntity> Set<TEntity>() where TEntity : EntityBase;
        int SaveChanges();

        DbSet<Player> Players { get; set; }
        DbSet<Ally> Allies { get; set; }
        DbSet<Village> Villages { get; set; }
    }
}