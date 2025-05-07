import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item!: {
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };
  buttonMessage: string | null = null;

  constructor(private cartService: CartService) {}

  addToCart() {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.buttonMessage = 'Please log in to add items to cart';
      setTimeout(() => this.buttonMessage = null, 3000);
      return;
    }
    
    this.cartService.addToCart(email, this.item).subscribe({
      next: (response) => {
        console.log('Item added to cart:', response);
        this.buttonMessage = 'Item added!';
        setTimeout(() => this.buttonMessage = null, 3000);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.buttonMessage = error.error?.message || 'Error adding item to cart. Please try again.';
        setTimeout(() => this.buttonMessage = null, 3000);
      }
    });
  }
}

