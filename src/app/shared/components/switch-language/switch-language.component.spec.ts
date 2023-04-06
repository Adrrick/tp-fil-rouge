import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchLanguageComponent } from './switch-language.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('SwitchLanguageComponent', () => {
  let component: SwitchLanguageComponent;
  let fixture: ComponentFixture<SwitchLanguageComponent>;
  let translateServiceMock: Partial<TranslateService>;


  beforeEach(async () => {
    translateServiceMock = {
      get: jest.fn().mockReturnValue(of('hello')),
    };

    await TestBed.configureTestingModule({
      imports: [SwitchLanguageComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
