using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tradingAppCS.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Username { get; set; }
    public string Password { get; set; }
    public string? Token { get; set; }
    public string? Role { get; set; }
    public string Email { get; set; }
    public decimal Balance { get; set; }
    public ICollection<StocksTable>? Stocks { get; } = new List<StocksTable>();
    public ICollection<TransactionsTable>? Transactions { get; } = new List<TransactionsTable>();
}