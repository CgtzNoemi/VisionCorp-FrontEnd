import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarSalarioComponent } from './form-editar-salario.component';

describe('FormEditarSalarioComponent', () => {
  let component: FormEditarSalarioComponent;
  let fixture: ComponentFixture<FormEditarSalarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditarSalarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEditarSalarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
