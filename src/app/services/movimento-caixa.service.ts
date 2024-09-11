import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimentoCaixa } from '../models/movimento-caixa';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class MovimentoCaixaService {

   constructor(private http: HttpClient) { }

  findById(id: any): Observable<MovimentoCaixa>{
    return this.http.get<MovimentoCaixa>(`${API_CONFIG.baseurl}/movimentos/${id}`);
  }

  findAll(): Observable<MovimentoCaixa[]>{
    return this.http.get<MovimentoCaixa[]>(`${API_CONFIG.baseurl}/movimentos`);
  }

  create(produto: MovimentoCaixa): Observable<MovimentoCaixa>{
    return this.http.post<MovimentoCaixa>(`${API_CONFIG.baseurl}/movimentos`,produto)
  }

  update(produto: MovimentoCaixa): Observable<MovimentoCaixa>{
    return this.http.put<MovimentoCaixa>(`${API_CONFIG.baseurl}/movimentos/${produto.id}`,produto);
  }

  delete(id: any): Observable<MovimentoCaixa>{
    return this.http.delete<MovimentoCaixa>(`${API_CONFIG.baseurl}/movimentos/${id}`);
  }
}
