import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conta } from '../models/conta';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Conta>{
    return this.http.get<Conta>(`${API_CONFIG.baseurl}/contas/${id}`);
  }

  findAll(): Observable<Conta[]>{
    return this.http.get<Conta[]>(`${API_CONFIG.baseurl}/contas`);
  }

  create(cliente: Conta): Observable<Conta>{
    return this.http.post<Conta>(`${API_CONFIG.baseurl}/contas`,cliente)
  }

  update(conta: Conta): Observable<Conta>{
    return this.http.put<Conta>(`${API_CONFIG.baseurl}/contas/${conta.id}`,conta);
  }

  delete(id: any): Observable<Conta>{
    return this.http.delete<Conta>(`${API_CONFIG.baseurl}/contas/${id}`);
  }
}
