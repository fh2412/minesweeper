import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterFlushComponent } from './water-flush.component';

describe('WaterFlushComponent', () => {
  let component: WaterFlushComponent;
  let fixture: ComponentFixture<WaterFlushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterFlushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterFlushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
