import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import users from 'src/app/fixtures/users.fixture';

import { UserLineComponent } from './user-line.component';
import { TranslateService } from '@ngx-translate/core';

describe('UserLineComponent', () => {
  let component: UserLineComponent;
  let fixture: ComponentFixture<UserLineComponent>;
  let translateServiceMock: Partial<TranslateService>;


  beforeEach(async () => {
    translateServiceMock = {
      instant: jest.fn().mockReturnValue('hello')
    }

    await TestBed.configureTestingModule({
      imports: [UserLineComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ]

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
