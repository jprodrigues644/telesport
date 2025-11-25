import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicMedalsPieChartComponent } from './olympic-medals-pie-chart.component';

/** Unit tests for OlympicMedalsPieChartComponent */
describe('OlympicMedalsPieChartComponent', () => {
  let component: OlympicMedalsPieChartComponent;
  let fixture: ComponentFixture<OlympicMedalsPieChartComponent>;

  /** TestBed configuration and component initialization */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicMedalsPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicMedalsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
