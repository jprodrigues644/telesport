import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMedalsAreaChartComponent } from './country-medals-bar-chart.component';

describe('CountryMedalsAreaChartComponent', () => {
  let component: CountryMedalsAreaChartComponent;
  let fixture: ComponentFixture<CountryMedalsAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryMedalsAreaChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryMedalsAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
