import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Trip } from '../../ITrip';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}
  cart: Trip[] = [];
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  getAmount() {
    return this.cartService.getCartAmount();
  }
  getCartCost() {
    return this.cartService.getCartCost();
  }
}
