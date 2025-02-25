import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from '../model/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  apiUrl = 'http://localhost:3000/employes';

  constructor(private http : HttpClient) {

  }

  getAllEmployes() : Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

  getEmployeById(id : number) : Observable<Employe> {
    return this.http.get<Employe>(this.apiUrl + '/' + id);
  }

  addEmploye(employe : Employe) : Observable<Employe> {
    return this.http.post<Employe>(this.apiUrl, employe);
  }

  updateEmploye(employe : Employe) : Observable<Employe> {
    return this.http.put<Employe>(this.apiUrl + '/' + employe.id, employe);
  }

  deleteEmploye(id : number) : Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

}
