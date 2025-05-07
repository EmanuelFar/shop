import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  productName: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item!: CartItem;

  get totalPrice(): number {
    return this.item.price * this.item.quantity;
  }
}
