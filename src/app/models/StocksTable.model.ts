export class StocksTable {
  Id?: number;
  StockName: string;
  DateBought: any;
  UserId: any;
  User?: null;
  buyingPrice: number;
  Quantity: number;

  constructor(
    StockName: string,
    UserId: any,
    buyingPrice: number,
    Quantity: number,
    DateBought: any
  ) {
    this.StockName = StockName;
    this.UserId = UserId;
    this.buyingPrice = buyingPrice;
    this.Quantity = Quantity;
    this.DateBought = DateBought;
  }
}
