import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Trip } from '../../ITrip';
import { FireBaseServiceService } from '../../services/fire-base-service.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private fb: FireBaseServiceService,
    public auth: AuthService,
    private router: Router
  ) {}
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
  buy() {
    this.fb.buy(this.auth.userData.uid, this.getCartIdsOnly());
    window.alert('Pomyślnie złożono zamówienie.');
    this.cart = [];
    this.router.navigate(['']);
  }
  getCartIdsOnly(): string[] {
    let arr: string[] = [];
    for (let item of this.cart) {
      arr.push(String(item.id));
    }
    return arr;
  }
}
