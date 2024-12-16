// src/app/services/rnd.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RNDRequest, RNDResponse } from '../models/rnd.model';

@Injectable({
  providedIn: 'root'
})
export class RNDService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchRNDData(request: RNDRequest): Observable<RNDResponse> {
    return this.http.post<RNDResponse>(
      `${this.apiUrl}/api/v1/rnd-data`,
      request
    );
  }
}