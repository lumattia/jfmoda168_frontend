import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUpdateRowComponent } from './stock-update-row.component';

describe('StockUpdateRowComponent', () => {
  let component: StockUpdateRowComponent;
  let fixture: ComponentFixture<StockUpdateRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockUpdateRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockUpdateRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
