import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';

/** Unit tests for DataService */
describe('DataService', () => {
  let service: DataService;

  /** TestBed configuration and service initialization */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]   
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
