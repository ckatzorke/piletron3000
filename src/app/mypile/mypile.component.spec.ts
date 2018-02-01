import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypileComponent } from './mypile.component';

describe('MypileComponent', () => {
  let component: MypileComponent;
  let fixture: ComponentFixture<MypileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
