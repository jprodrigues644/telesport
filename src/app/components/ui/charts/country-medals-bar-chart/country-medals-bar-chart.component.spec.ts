import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMedalsBarChartComponent } from './country-medals-bar-chart.component';

describe('CountryMedalsAreaChartComponent', () => {
  let component: CountryMedalsBarChartComponent;
  let fixture: ComponentFixture<CountryMedalsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryMedalsBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryMedalsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
