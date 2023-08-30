using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace tradingAppCS.Services;

public class StockService
{
    private readonly HttpClient _httpClient;
    
        private readonly IMemoryCache _cache;
        string apiKey = "B2H13FTE1B9H9E26";
    
        public StockService(HttpClient httpClient, IMemoryCache memoryCache)
        {
            _httpClient = httpClient;
            _cache = memoryCache;
        }
    
        public async Task<List<decimal>> GetRealTimeStockPrice(string symbol)
        {
            // Define cache key
            var cacheKey = $"StockPrice-{symbol}";

            // Try to get value from cache
            if (_cache.TryGetValue(cacheKey, out List<decimal> cachedClosingValues))
            {
                // Return cached value if found
                return cachedClosingValues;
            }

            // Value not found in cache, fetch from API
            var response = await _httpClient.GetAsync(
                $"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol +
                "&interval=5min&apikey=" + apiKey);
            var content = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<StockResponse>(content);

            if (data == null)
            {
                throw new Exception("Failed to fetch stock price from Alpha Vantage API");
            }

            var closingValues = data.TimeSeries.Select(x => decimal.Parse(x.Value["4. close"])).ToList();

            // Set cache value with expiration time of 5 minutes
            _cache.Set(cacheKey, closingValues, TimeSpan.FromMinutes(5));

            return closingValues;
        }
        
        
    
        
}

public class StockResponse
{
    [JsonProperty("Meta Data")]
    public Dictionary<string, string> MetaData { get; set; }
    [JsonProperty("Time Series (5min)")]
    public Dictionary<string, Dictionary<string, string>> TimeSeries { get; set; }
}

