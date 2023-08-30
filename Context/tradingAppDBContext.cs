using Microsoft.EntityFrameworkCore;
using tradingAppCS.Models;

namespace tradingAppCS.Context;

public class tradingAppDBContext : DbContext
{
    public tradingAppDBContext(DbContextOptions<tradingAppDBContext> options) : base(options)
    {
        
    }
    public DbSet<User> Users { get; set; }
    public DbSet<StocksTable> StocksTable{ get; set; }
    public DbSet<TransactionsTable> TransactionsTable { get; set; }
    public DbSet<kycTable> kycTable { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().ToTable("tradingAppUsers");
        builder.Entity<StocksTable>().ToTable("StocksTable");
        builder.Entity<TransactionsTable>().ToTable("TransactionsTable");
        builder.Entity<kycTable>().ToTable("kycTable");
        
    }
}