import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { NgZorroSharedModule } from '../shared/ng-zorro.module';
import { TaskPageComponent } from './task-page.component';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPageComponent],
      imports: [NgZorroSharedModule],
      providers: [
        provideMockStore({
          initialState: {
            auth: { user: { email: 'test@example.com' } },
            tasks: { tasks: [] }
          }
        }),
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

