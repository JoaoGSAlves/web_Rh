import { TestBed } from '@angular/core/testing';

import { EmpregadoService } from './empregado.service';

describe('EmployeeService', () => {
  let service: EmpregadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpregadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
