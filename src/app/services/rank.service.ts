import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Rank } from '../models/rank';

@Injectable({
  providedIn: 'root'
})
export class RankSerivice{

     constructor(private http: HttpClient) { }

     Rank(): Observable<Rank[]>{
    return this.http.get<Rank[]>(`${API_CONFIG.baseurl}/pedidos/ranking`);
  }
}