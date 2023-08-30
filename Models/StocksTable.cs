using System.ComponentModel.DataAnnotations;

namespace tradingAppCS.Models;

public class StocksTable
{
        [Key]
        public int Id { get; set; }
        public string? StockName { get; set; }
        public DateTime DateBought { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public decimal buyingPrice { get; set; }
        public int Quantity { get; set; }
        
    // Search for buyingPrice == 0 if you're looking for the Sell transactions and opposite
    // A solution to doing most calculations for amount bought/sold would be to call the buy
    // or sell methods in another method within the stock service
}