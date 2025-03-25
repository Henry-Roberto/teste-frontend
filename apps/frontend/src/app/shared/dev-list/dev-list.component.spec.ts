import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DevListComponent } from './dev-list.component';
import { PersonService } from 'src/app/core/services/person/person.service';
import { Person } from 'src/app/core/models/Person.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DevListComponent', () => {
  let component: DevListComponent;
  let fixture: ComponentFixture<DevListComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PersonService', ['getPersons', 'getPerson', 'deletePerson']);

    await TestBed.configureTestingModule({
      declarations: [DevListComponent],
      providers: [{ provide: PersonService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DevListComponent);
    component = fixture.componentInstance;
    personServiceSpy = TestBed.inject(PersonService) as jasmine.SpyObj<PersonService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch devs on init', () => {
    const mockDevs: Person[] = [new Person('1', 'Dev One', 'devone@example.com')];
    personServiceSpy.getPersons.and.returnValue(of(mockDevs));

    component.getDevs();
    expect(personServiceSpy.getPersons).toHaveBeenCalled();
    expect(component.devs.length).toBe(1);
  });

  it('should edit a developer', () => {
    const mockDev = new Person('1', 'Dev One', 'devone@example.com');
    personServiceSpy.getPerson.and.returnValue(of(mockDev));
    spyOn(component.devSelectedChanged, 'emit');

    component.editDev('1');
    expect(personServiceSpy.getPerson).toHaveBeenCalledWith('1');
    expect(component.devSelected).toEqual(mockDev);
    expect(component.devSelectedChanged.emit).toHaveBeenCalledWith(mockDev);
  });

  it('should delete a developer', () => {
    const mockDevs: Person[] = [new Person('1', 'Dev One', 'devone@example.com')];
    component.devs = mockDevs;
    personServiceSpy.deletePerson.and.returnValue(of(null));
    spyOn(component.devSelectedChanged, 'emit');

    component.deleteDev('1');
    expect(personServiceSpy.deletePerson).toHaveBeenCalledWith('1');
    expect(component.devs.length).toBe(0);
    expect(component.devSelectedChanged.emit).toHaveBeenCalled();
  });
});