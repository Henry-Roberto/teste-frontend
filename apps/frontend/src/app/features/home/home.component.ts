import { Component } from '@angular/core';
import { Person } from 'src/app/core/models/Person.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  filters = {
    searchText: '',
  }

  searchText: string = '';
  devSelected: Person = new Person('', '', '');

  constructor() { }

  onSearchChanged(searchValue: string) {
    this.filters = { searchText: searchValue };
  }

  onDevSelectedChange(event: Person) {
    this.devSelected = event;
  }

  onDevCreated() {
    this.devSelected = new Person('', '', '');
  }
}
