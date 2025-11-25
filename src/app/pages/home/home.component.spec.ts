import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { DataService } from 'src/app/services/data.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const dataServiceMock = {
    getDataOlympics: () => of([]),
    getTotalJOs: () => of(0),
    getMedalsByCountry: () => of({ labels: [], data: [] }),
  };

  const responsiveServiceMock = {
    size$: of('medium'),
    isMobile$: of(false),
    orientation$: of('landscape'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: ResponsiveService, useValue: responsiveServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
