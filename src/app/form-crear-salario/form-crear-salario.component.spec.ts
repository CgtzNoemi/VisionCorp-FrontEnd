import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearSalarioComponent } from './form-crear-salario.component';

describe('FormCrearSalarioComponent', () => {
  let component: FormCrearSalarioComponent;
  let fixture: ComponentFixture<FormCrearSalarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearSalarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCrearSalarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
