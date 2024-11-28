import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personajes } from '../interface/personajes';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private apiUrl = 'http://localhost:3000/api/lol';

  constructor(private http: HttpClient) {}

  getPersonajes(): Observable<Personajes> {
    return this.http.get<Personajes>(this.apiUrl);
  }

  addPersonaje(personaje: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, personaje);
  }

  updatePersonaje(id: string, personaje: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, personaje);
  }

  deletePersonaje(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}
