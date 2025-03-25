import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Person } from '../../models/Person.model';
import { ErrorUtil } from '../../utils/errorUtil';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(public apiService: ApiService) { }

  getPersons(searchText: string = ''): Observable<Array<Person>> {
    return this.apiService.get<Array<Person>>('persons', { searchText }).pipe(
      map((data: Array<Person>) => data),
      catchError((err) => {
        ErrorUtil.handleError('Erro ao buscar usuários.', err);
        return [];
      })
    );
  }

  getPerson(id: string): Observable<Person> {
    return this.apiService.get<Person>('person', { id }).pipe(
      map((data: Person) => data),
      catchError((err) => {
        ErrorUtil.handleError('Erro ao buscar usuário.', err);
        return of(new Person('', '', ''));
      })
    );
  }

  createPerson(person: Person): Observable<Person> {
    return this.apiService.post<Person>('person', person).pipe(
      map((data: Person) => data),
      catchError((err) => {
        ErrorUtil.handleError('Erro ao criar usuário.', err);
        return of(new Person('', '', ''));
      })
    );
  }

  updatePerson(person: Person): Observable<Person> {
    const params = { id: person._id };

    return this.apiService.put<Person>('person', person, params).pipe(
      map((data: Person) => data),
      catchError((err) => {
        ErrorUtil.handleError('Erro ao atualizar usuário.', err);
        return of(new Person('', '', ''));
      })
    );
  }

  deletePerson(id: string): Observable<Person | null> {
    return this.apiService.delete<Person>('person', { id }).pipe(
      map((data: Person) => data),
      catchError((err) => {
        ErrorUtil.handleError('Erro ao deletar usuário.', err);
        return of(new Person('', '', ''));
      })
    );
  }
}
