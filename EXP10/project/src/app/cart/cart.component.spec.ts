import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(product: Product): void {
    console.log('Removing product:', product); // Optional: For debugging
    this.cartService.removeFromCart(product);
    this.cart = this.cartService.getCart(); // Refresh the cart array to update the view
  }
}
