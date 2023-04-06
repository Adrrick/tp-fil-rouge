import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AvatarComponent } from './avatar.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let translateServiceMock: Partial<TranslateService>;


  beforeEach(async () => {
    translateServiceMock = {
      get: jest.fn().mockReturnValue(of('hello'))
    }


    await TestBed.configureTestingModule({
      imports: [AvatarComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
