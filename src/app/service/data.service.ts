import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmazonProduct } from '../models/AmazonProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  base_url: string = 'http://localhost:4201';
  constructor(private http: HttpClient) { }

  getProduct(asin: string): Observable<AmazonProduct> {
    return this.http.post<AmazonProduct>(`${this.base_url}/product`, { ASIN: asin });
  }

  getCustomProduct() {
    return this.http.get<AmazonProduct>(`${this.base_url}/custom-product`);
  }

  saveProduct(data: AmazonProduct) {
    return this.http.post<AmazonProduct>(`${this.base_url}/saveProduct`, data);
  }
}
