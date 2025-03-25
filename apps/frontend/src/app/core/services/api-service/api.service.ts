import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, paramsObj?: { [key: string]: string | number }): Observable<T> {
    const params = this.createParams(paramsObj);

    return this.http.get<T>(`${this.API_BASE_URL}/${endpoint}`, { params }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erro ao buscar dados da API:', error);
        return throwError(() => new Error('Erro ao obter os dados. Tente novamente mais tarde.'));
      })
    );
  }

  post<T>(endpoint: string, body: T): Observable<T> {
    return this.http.post<T>(`${this.API_BASE_URL}/${endpoint}`, body).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erro ao enviar dados para API:', error);
        alert('Erro ao enviar os dados. Tente novamente mais tarde.');
        return throwError(() => new Error('Erro ao enviar os dados. Tente novamente mais tarde.'));
      })
    );
  }

  put<T>(endpoint: string, body: T, paramsObj?: { [key: string]: string | number }): Observable<T> {
    const params = this.createParams(paramsObj);

    return this.http.put<T>(`${this.API_BASE_URL}/${endpoint}`, body, { params }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erro ao atualizar dados na API:', error);
        alert('Erro ao atualizar os dados. Tente novamente mais tarde.');
        return throwError(() => new Error('Erro ao atualizar os dados. Tente novamente mais tarde.'));
      })
    );
  }

  delete<T>(endpoint: string, paramsObj?: { [key: string]: string | number }): Observable<T> {
    const params = this.createParams(paramsObj);

    return this.http.delete<T>(`${this.API_BASE_URL}/${endpoint}`, { params }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erro ao deletar dados da API:', error);
        alert('Erro ao deletar os dados. Tente novamente mais tarde.');
        return throwError(() => new Error('Erro ao deletar os dados. Tente novamente mais tarde.'));
      })
    );
  }

  private createParams(paramsObj?: { [key: string]: string | number | boolean }): HttpParams {
    let params = new HttpParams();

    try {
      if (paramsObj) {
        Object.keys(paramsObj).forEach(key => {
          if (paramsObj[key].toString()) {
            params = params.set(key, paramsObj[key].toString());
          }
        });
      }
    } catch (error) {
      console.error('Erro ao criar parâmetros HTTP:', error);
    }

    return params;
  }
}