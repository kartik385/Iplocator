import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultbarComponent } from './resultbar.component';

describe('ResultbarComponent', () => {
  let component: ResultbarComponent;
  let fixture: ComponentFixture<ResultbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
