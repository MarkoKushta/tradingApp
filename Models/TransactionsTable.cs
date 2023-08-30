using System.ComponentModel.DataAnnotations;

namespace tradingAppCS.Models;

public class TransactionsTable
{

    [Key]
    public int? Id { get; set; }
    public int StockId { get; set; }
    public string? StockName { get; set; }
    public DateTime CreatedOn { get; set; }
    public int UserId { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public TransactionType Type { get; set; }
    
}

public enum TransactionType
{
    Sell, Buy
}
