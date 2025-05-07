import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

interface CartItem {
  productName: string;
  quantity: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(email: string, item: { name: string; price: number; imageUrl: string; description: string }) {
    return this.http.post<{ message: string; cart: CartItem[] }>(`${environment.apiUrl}/api/cart/add`, { 
      email, 
      productName: item.name,
      price: item.price
    });
  }

  getCart(email: string): Observable<{ cart: CartItem[] }> {
    return this.http.post<{ cart: CartItem[] }>(`${environment.apiUrl}/api/cart`, { email });
  }

  deleteCart(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/api/cart/delete`, { email });
  }
}