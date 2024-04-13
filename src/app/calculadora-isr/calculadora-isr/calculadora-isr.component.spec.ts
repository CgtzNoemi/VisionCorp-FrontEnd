import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraISRComponent } from './calculadora-isr.component';

describe('CalculadoraISRComponent', () => {
  let component: CalculadoraISRComponent;
  let fixture: ComponentFixture<CalculadoraISRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraISRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculadoraISRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
