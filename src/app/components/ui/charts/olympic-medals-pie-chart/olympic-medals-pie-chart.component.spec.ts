import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicMedalsPieChartComponent } from './olympic-medals-pie-chart.component';

describe('OlympicMedalsPieChartComponent', () => {
  let component: OlympicMedalsPieChartComponent;
  let fixture: ComponentFixture<OlympicMedalsPieChartComponent>;

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
