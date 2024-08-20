import { Produto } from '../models/produto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Produto>{
    return this.http.get<Produto>(`${API_CONFIG.baseurl}/produtos/${id}`);
  }

  findAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${API_CONFIG.baseurl}/produtos`);
  }

  create(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(`${API_CONFIG.baseurl}/produtos`,produto)
  }

  update(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${API_CONFIG.baseurl}/produtos/${produto.id}`,produto);
  }

  delete(id: any): Observable<Produto>{
    return this.http.delete<Produto>(`${API_CONFIG.baseurl}/produtos/${id}`);
  }
}
