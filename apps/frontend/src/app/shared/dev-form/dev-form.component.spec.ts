import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevFormComponent } from './dev-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from 'src/app/core/services/person/person.service';
import { of } from 'rxjs';
import { Person } from 'src/app/core/models/Person.model';
import { HttpClientModule } from '@angular/common/http';

describe('DevFormComponent', () => {
  let component: DevFormComponent;
  let fixture: ComponentFixture<DevFormComponent>;
  let mockPersonService: jasmine.SpyObj<PersonService>;

  beforeEach(async () => {
    mockPersonService = jasmine.createSpyObj('PersonService', ['createPerson']);

    await TestBed.configureTestingModule({
      declarations: [DevFormComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        { provide: PersonService, useValue: mockPersonService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.devForm).toBeDefined();
    expect(component.devForm.controls['name']).toBeDefined();
    expect(component.devForm.controls['email']).toBeDefined();
    expect(component.devForm.controls['name'].valid).toBeFalse();
    expect(component.devForm.controls['email'].valid).toBeFalse();
  });

  it('should validate the name field (required and minimum 3 characters)', () => {
    const nameControl = component.devForm.controls['name'];

    nameControl.setValue('');
    expect(nameControl.valid).toBeFalse();
    expect(nameControl.errors?.['required']).toBeTruthy();

    nameControl.setValue('ab');
    expect(nameControl.valid).toBeFalse();
    expect(nameControl.errors?.['minlength']).toBeTruthy();

    nameControl.setValue('John Doe');
    expect(nameControl.valid).toBeTrue();
  });

  it('should validate the email field', () => {
    const emailControl = component.devForm.controls['email'];

    emailControl.setValue('');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['required']).toBeTruthy();

    emailControl.setValue('invalid-email');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['email']).toBeTruthy();

    emailControl.setValue('valid@email.com');
    expect(emailControl.valid).toBeTrue();
  });

  it('should call the service if the form is valid', () => {
    spyOn(window, 'alert');

    component.devForm.setValue({
      _id: '1',
      githubUser: 'johndoe',
      name: 'John Doe',
      email: 'john@example.com',
      city: 'New York',
      training: 'Full Stack',
      technologies: 'Angular, Node.js',
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockPersonService.createPerson.and.returnValue(of({} as Person));

    component.create();

    expect(mockPersonService.createPerson).toHaveBeenCalled();
    expect(component.devForm.pristine).toBeTrue();
  });
});
