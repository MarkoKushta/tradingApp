import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSellComponent } from './stock-sell.component';

describe('StockSellComponent', () => {
  let component: StockSellComponent;
  let fixture: ComponentFixture<StockSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
