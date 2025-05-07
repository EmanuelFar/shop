import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart-service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';

interface CartItem {
  productName: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  errorMessage: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  loadCart() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.cartService.getCart(email).subscribe({
        next: (res) => {
          this.cartItems = res.cart || [];
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error loading cart:', error);
          this.errorMessage = error.message || 'Error loading cart';
          this.cartItems = [];
        }
      });
    } else {
      this.errorMessage = 'Please log in to view your cart';
      this.cartItems = [];
    }
  }

  deleteCart() {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.errorMessage = 'Please log in to delete your cart';
      return;
    }

    this.cartService.deleteCart(email).subscribe({
      next: () => {
        this.cartItems = [];
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error deleting cart:', error);
        this.errorMessage = error.message || 'Error deleting cart';
      }
    });
  }

  addToCart(item: { name: string; price: number; imageUrl: string; description: string }) {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.errorMessage = 'Please log in to add items to cart';
      return;
    }

    this.cartService.addToCart(email, item).subscribe({
      next: () => {
        this.loadCart(); // Reload cart after adding item
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.errorMessage = error.message || 'Error adding item to cart';
      }
    });
  }
}