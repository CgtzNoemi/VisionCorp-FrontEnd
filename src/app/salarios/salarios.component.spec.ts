import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalariosComponent } from './salarios.component';

describe('SalariosComponent', () => {
  let component: SalariosComponent;
  let fixture: ComponentFixture<SalariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
