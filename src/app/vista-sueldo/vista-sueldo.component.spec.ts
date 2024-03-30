import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSueldoComponent } from './vista-sueldo.component';

describe('VistaSueldoComponent', () => {
  let component: VistaSueldoComponent;
  let fixture: ComponentFixture<VistaSueldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSueldoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaSueldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
