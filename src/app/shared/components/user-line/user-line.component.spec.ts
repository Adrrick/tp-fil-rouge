import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import users from 'src/app/fixtures/users.fixture';

import { UserLineComponent } from './user-line.component';

describe('UserLineComponent', () => {
  let component: UserLineComponent;
  let fixture: ComponentFixture<UserLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLineComponent, RouterTestingModule],

    }).compileComponents();

    fixture = TestBed.createComponent(UserLineComponent);
    component = fixture.componentInstance;
    component.user = users[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
