import { Injectable } from '@angular/core';
import { Trip } from '../ITrip';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private fb: FireBaseServiceService) {
    // auth.getAuthenticated().subscribe((res: any) => {
    //   // console.log(res);
    //   if (res != null) {
    //     // this.fb.getCart(res.uid).subscribe((cart) => {
    //     //   this.trips = cart as Trip[];
    //     // });
    //   } else {
    //     this.setCart([]);
    //   }
    // });
  }

  trips: Trip[] = [];

  setCart(trips: Trip[]) {
    this.trips = trips;
    // this.fb.setCart(this.auth.userData.uid, this.trips);
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
