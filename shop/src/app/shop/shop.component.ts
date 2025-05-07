import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  items = [
    {
      name: 'AI Chatbot Service',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&h=400&q=80',
      price: 299.99,
      description: 'Custom AI chatbot solution for your business'
    },
    {
      name: 'AI DevOps Service',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&h=400&q=80',
      price: 499.99,
      description: 'AI-powered DevOps automation and optimization'
    },
    {
      name: 'Server & Network Automation',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&h=400&q=80',
      price: 399.99,
      description: 'Automated server and network management solutions'
    },
    {
      name: 'AI Data Analysis',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=400&q=80',
      price: 349.99,
      description: 'Advanced AI-powered data analysis and insights'
    },
    {
      name: 'Cloud Infrastructure AI',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&h=400&q=80',
      price: 449.99,
      description: 'AI-driven cloud infrastructure optimization'
    },
    {
      name: 'AI Security Monitoring',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&h=400&q=80',
      price: 399.99,
      description: 'Intelligent security monitoring and threat detection'
    }
  ];
}
