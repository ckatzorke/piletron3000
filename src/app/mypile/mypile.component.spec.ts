import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPileComponent } from './mypile.component';

describe('MypileComponent', () => {
  let component: MyPileComponent;
  let fixture: ComponentFixture<MyPileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
