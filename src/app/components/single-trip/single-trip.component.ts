import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
import { Trip } from '../../ITrip';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { Review } from '../../IReview';
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FireBaseServiceService,
    private cartService: CartService
  ) {}

  private subscription: Subscription | undefined;
  id: number = -1;
  selected: number = 0;
  currentTrip: Trip;
  reviews: Review[] = [];
  cart: Trip[] = [];
  howManyChose: number = 0;
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.fb
        .getData()
        .pipe(first())
        .subscribe((trips: any[]) => {
          let trip: any;
          for (let d of trips) {
            if (d.id == this.id) {
              trip = d;
              break;
            }
          }
          // console.log(trip);
          this.cart = this.cartService.getCart();
          this.how();
          this.currentTrip = trip;
        });
    });
  }
  how() {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == this.id) {
        this.howManyChose += 1;
      }
    }
  }
  nextPhoto() {
    if (this.selected == this.currentTrip.img.length - 1) this.selected = 0;
    else {
      this.selected += 1;
    }
  }
  previousPhoto() {
    if (this.selected >= 1) this.selected -= 1;
    else {
      this.selected = this.currentTrip.img.length - 1;
    }
  }
  ratingEventHandler(trip: Trip, ev: any) {
    this.currentTrip.amountVote++;
    this.currentTrip.amountPoints += ev + 1;
    this.fb.updateRate(
      trip.id,
      this.currentTrip.amountVote,
      this.currentTrip.amountPoints
    );
  }
  addReview(newReview: any) {
    console.log(newReview);
    this.reviews.push(newReview);
  }
  upClick(trip: Trip) {
    if (trip.amount - this.howManyChose > 0) {
      this.howManyChose++;
      this.cart.push(trip);
      this.cartService.setCart(this.cart);
    }
  }
  downClick(trip: Trip) {
    if (this.howManyChose > 0) {
      this.howManyChose--;
      var index = -1;
      for (let i = 0; i < this.cart.length; i++) {
        if (trip.id == this.cart[i].id) {
          index = i;
        }
      }
      // console.log(trip, this.cart);
      if (index > -1) this.cart.splice(index, 1);
    }
    this.cartService.setCart(this.cart);
  }
}
