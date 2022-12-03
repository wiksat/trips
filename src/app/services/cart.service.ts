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

  getCart(): Trip[] {
    return this.trips;
  }
}
