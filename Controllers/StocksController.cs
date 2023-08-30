using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tradingAppCS.Context;
using tradingAppCS.Models;
using tradingAppCS.Services;
namespace tradingAppCS.Controllers;


[ApiController]
[Route("api/[controller]")]
public class StocksController: ControllerBase
{
    private readonly StockService _stockService;

    public StocksController(StockService stockService, tradingAppDBContext context)
    {
        _stockService = stockService;
        _authContext = context;
    }
    
    private readonly tradingAppDBContext _authContext;
    
    
    

    [HttpGet("{symbol}")]
    public async Task<IActionResult> Get(string symbol)
    {
        var price = await _stockService.GetRealTimeStockPrice(symbol);
        return Ok(price);
    }
    
    
   
    [HttpGet("GetAllStocksByUser/{userId}")]
    public async Task<ActionResult<List<StocksTable>>> GetStocks(int userId)
    {

        var response = await _authContext.StocksTable
            .Where(x => x.UserId == userId).ToListAsync();
        return Ok(response);
    }
    
    private static Dictionary<decimal, (decimal, DateTime)> buyingPriceCache = new Dictionary<decimal, (decimal, DateTime)>();

    [HttpGet("getBuyingPrice/{userId}")]
    public async Task<ActionResult<List<StocksTable>>> StockBuyingPrice(int userId, int stockId)
    {
        // Check if a value is cached for this stockId
        if (buyingPriceCache.TryGetValue(stockId, out var cachedValue))
        {
            // Check if the cached value is less than 5 minutes old
            if (DateTime.UtcNow - cachedValue.Item2 < TimeSpan.FromMinutes(5))
            {
                // Return the cached value
                return Ok(cachedValue.Item1);
            }
        }

        var stock = await _authContext.StocksTable.FirstOrDefaultAsync(x => x.Id == stockId && x.UserId == userId);
        var random = new Random();
        stock.buyingPrice = stock.buyingPrice + random.Next(1, 11);

        // Cache the returned value
        buyingPriceCache[stockId] = (stock.buyingPrice, DateTime.UtcNow);

        return Ok(stock.buyingPrice);
    }
    
    [HttpGet("GetAllTransactionsByUser/{userId}")]
    public async Task<ActionResult<List<TransactionsTable>>> GetTransactions(int userId)
    {

        var response = await _authContext.TransactionsTable
            .FirstOrDefaultAsync(x => x.UserId == userId);
        return Ok(response);
    }
    
    [HttpGet("GetBalanceByUser/{userId}")]
    public async Task<ActionResult<List<TransactionsTable>>> GetBalance(int userId)
    {

        var response = await _authContext.Users
            .FirstOrDefaultAsync(x => x.Id == userId);
        return Ok(response.Balance);
    }
    
    
    [HttpPost("{symbol}/buyStock")]
    public async Task<IActionResult> BuyStock(string symbol, int userId, [FromBody] StocksTable stocksObj, int quantity)
    {
        if (stocksObj == null)
            return BadRequest();
        
        var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null)
            return NotFound(new { Message = "User not found" });
        
        stocksObj.UserId = user.Id;
        
        stocksObj.User = null;
        stocksObj.Quantity = quantity;
        stocksObj.StockName = symbol;
        var stockPrices = await _stockService.GetRealTimeStockPrice(symbol);
        
        stocksObj.buyingPrice = stockPrices.FirstOrDefault();
        
        if (user.Balance >= (stockPrices.FirstOrDefault() * stocksObj.Quantity))
        {
            user.Balance = user.Balance - (stockPrices.FirstOrDefault() * stocksObj.Quantity);
        }
        else
        {
            return NotFound(new { Message = "Not enough Dollas to complete transaction" });
        }
            
        
        await _authContext.AddAsync(stocksObj);
        
        var transactionsObj = new TransactionsTable
        {
            UserId = user.Id,
            StockId = stocksObj.Id,
            Type = TransactionType.Buy,
            Price = stockPrices.FirstOrDefault(),
            Quantity = stocksObj.Quantity,
            StockName = stocksObj.StockName
        };
    
        // Add the transaction object to the transactions table
        await _authContext.AddAsync(transactionsObj);
        
        await _authContext.SaveChangesAsync();
        return Ok(new
        {
            Message = "Stock Bought!"
        });
    }
    
    [HttpPost("{symbol}/sellStock")]
    public async Task<IActionResult> SellStock(string symbol, int userId, int quantity, int stockId, decimal price)
    {
    
        var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null)
            return NotFound(new { Message = "User not found" });
        
        var stock = await _authContext.StocksTable.FirstOrDefaultAsync(x => x.Id == stockId);
        if (stock == null)
            return NotFound(new { Message = "Stock not found" });
        
        //var stockPrices = await _stockService.GetRealTimeStockPrice(symbol);
        
        var transactionsObj = new TransactionsTable
        {
            UserId = user.Id,
            StockId = stock.Id,
            Type = TransactionType.Sell,
            Price = price,
            Quantity = quantity,
            StockName = symbol
        };
        
        
        
        transactionsObj.Price = price;
        user.Balance = user.Balance + (price * quantity);
        stock.Quantity = stock.Quantity - quantity;

        if (stock.Quantity == 0)
        {
            // Remove the sold stock from the user's stock list
            var stockToRemove = _authContext.StocksTable.FirstOrDefault(s => s.StockName == symbol && (s.Id == stockId && s.UserId == user.Id));
        
            _authContext.StocksTable.Remove(stockToRemove);
        }
        
    
        // Add the transaction object to the transactions table
        await _authContext.AddAsync(transactionsObj);
        
        await _authContext.SaveChangesAsync();
        return Ok(new
        {
            Message = "Stock Sold!"
        });
    }
    
    
}