import { Injectable } from '@angular/core';
import { Trip } from '../ITrip';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  trips: Trip[] = [];

  setCart(dishes: Trip[]) {
    this.trips = dishes;
  }
  getCartAmount() {
    return this.trips.length;
  }
  getCartCost() {
    let howMuchMany = 0;
    for (let trip of this.trips) {
      howMuchMany += trip.price;
    }
    return howMuchMany;
  }
  getCart(): Trip[] {
    return this.trips;
  }
}
