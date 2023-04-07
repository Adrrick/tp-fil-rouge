import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FullScreenLoaderComponent } from './full-screen-loader.component';

describe('FullScreenLoaderComponent', () => {
  let component: FullScreenLoaderComponent;
  let fixture: ComponentFixture<FullScreenLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullScreenLoaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FullScreenLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
