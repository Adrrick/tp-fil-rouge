import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import users from 'src/app/fixtures/users.fixture';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileDetailsComponent } from './profile-details.component';
import { of } from 'rxjs'

describe('ProfileDetailsComponent', () => {
  let component: ProfileDetailsComponent;
  let fixture: ComponentFixture<ProfileDetailsComponent>;
  let userServiceMock: Partial<UserService>;
  let storageServiceMock: Partial<StorageService>;

  const user = users[0];

  beforeEach(async () => {
    userServiceMock = {
      getUserByUID: jest.fn().mockReturnValue(of(user))
    }

    storageServiceMock = {
      getUID: jest.fn().mockReturnValue(user.uid)
    }

    await TestBed.configureTestingModule({
      imports: [ProfileDetailsComponent, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: StorageService, useValue: storageServiceMock },

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(storageServiceMock.getUID).toHaveBeenCalled();

    expect(userServiceMock.getUserByUID).toHaveBeenCalledWith(user.uid);
  });
});
