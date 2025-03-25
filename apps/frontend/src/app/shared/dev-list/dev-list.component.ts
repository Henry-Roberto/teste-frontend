import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Person } from 'src/app/core/models/Person.model';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.scss']
})
export class DevListComponent implements OnChanges {
  @Input() filters = { searchText: '' };
  @Input() devSelected: Person | null = null;
  @Output() devSelectedChanged: EventEmitter<Person> = new EventEmitter();

  devs: Person[] = [];
  isLoadingDevs = true;
  idDevInProcess = '';

  constructor(private personService: PersonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const devSelectedChange = changes['devSelected'] && changes['devSelected'].currentValue && !this.devSelected?._id;
    const filtersChanges = changes['filters'] && changes['filters'].currentValue;

    if (devSelectedChange || filtersChanges) {
      this.getDevs();
    }
  }

  getDevs() {
    this.isLoadingDevs = true;
    this.personService.getPersons(this.filters.searchText).subscribe((persons) => {
      this.devs = persons;
      this.devSelected = null;
      this.isLoadingDevs = false;
    });
  }

  editDev(id: string) {
    this.idDevInProcess = id;
    this.personService.getPerson(id).subscribe((person) => {
      this.devSelectedChanged.emit(person);
      this.devSelected = person;
      this.clearDevInProcess();
    });
  }

  deleteDev(id: string) {
    this.idDevInProcess = id;
    this.personService.deletePerson(id).subscribe(() => {
      const index = this.devs.findIndex((dev) => dev._id === id);
      this.devs.splice(index, 1);
      this.devSelected = new Person('', '', '');
      this.devSelectedChanged.emit(this.devSelected);
      this.clearDevInProcess();
    });
  }

  clearDevInProcess() {
    this.idDevInProcess = '';
  }
}
