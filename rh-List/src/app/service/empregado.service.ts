import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Empregado } from '../models/empregado.model';
import { environment } from '../../environments/environment';
import { Token } from '../models/token.model';

const API = environment.apiServer;

@Injectable({
  providedIn: 'root',
})
export class EmpregadoService {
  private readonly baseUrl = `${API}api/Empregado`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getToken(Token: Token): Observable<any> {
    return this.http.post<Token>(
      'https://localhost:7216/api/Identity/token',
      Token,
      this.httpOptions
    );
  }

  getEmpregados(): Observable<Empregado[]> {
    console.log('Fetching empregados from API');
    return this.http
      .get<Empregado[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  addEmpregado(Empregado: Empregado): Observable<Empregado> {
    return this.http.post<Empregado>(this.baseUrl, Empregado, this.httpOptions);
  }

  updateEmpregado(id: string, Empregado: Empregado): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, Empregado, this.httpOptions);
  }

  deleteEmpregado(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .delete<void>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof HttpErrorResponse) {
      errorMessage = 'Ocorreu um erro: ' + error.error.message;
    } else {
      errorMessage = `O backend retornou o código ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
