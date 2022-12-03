import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonGetService } from 'src/app/services/json-get.service';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
import { Options } from '@angular-slider/ngx-slider';
import { CartService } from 'src/app/services/cart.service';
import { Trip } from '../../ITrip';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  tripsArray: Trip[];
  distinctCountryArray: string[];
  currentCountryArray: String[];
  currentStarArray: Number[];
  currentStartDate: any;
  currentEndDate: any;
  value: number;
  highValue: number;
  options: Options;
  showAddScreen: boolean = false;
  cart: Trip[] = [];
  constructor(
    private service: JsonGetService,
    private fb: FireBaseServiceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fb.getData().subscribe((res: any) => {
      console.log(res);
      this.tripsArray = res;
      console.log(this.tripsArray);
      for (let i = 0; i < this.tripsArray.length; i++) {
        this.tripsArray[i].howManyChose = 0;
      }

      this.value = this.getMin();
      this.highValue = this.getMax();
      this.options = {
        floor: this.getMin(),
        ceil: this.getMax(),
      };

      // console.log(this.getDistinctCountry());
      this.getDistinctCountry();
      this.currentCountryArray = [...this.distinctCountryArray];
      this.currentStarArray = [0, 1, 2, 3, 4, 5];
      this.currentStartDate = '1970-01-01';
      this.currentEndDate = '2038-01-01';
    });
  }

  ngOnDestroy() {
    this.cartService.setCart(this.cart);
    // this.dishesSub?.unsubscribe();
  }

  changeShowScreen() {
    this.showAddScreen = !this.showAddScreen;
  }
  getTripArray() {
    return this.tripsArray;
  }
  getDistinctCountry() {
    this.distinctCountryArray = [
      ...new Set(this.tripsArray.map((item) => item.country)),
    ];
  }
  onChangeCountry(ev: any) {
    if (ev.target.checked) {
      this.currentCountryArray.push(ev.target.value);
    } else {
      for (var i = 0; i < this.currentCountryArray.length; i++) {
        if (this.currentCountryArray[i] === ev.target.value) {
          this.currentCountryArray.splice(i, 1);
          i--;
        }
      }
    }
    console.log(this.currentCountryArray);
  }
  onChangeStar(ev: any) {
    if (ev.target.checked) {
      this.currentStarArray.push(parseInt(ev.target.value));
    } else {
      for (var i = 0; i < this.currentStarArray.length; i++) {
        if (this.currentStarArray[i] === parseInt(ev.target.value)) {
          this.currentStarArray.splice(i, 1);
          i--;
        }
      }
    }
    console.log(this.currentStarArray);
  }
  startChange(ev: any) {
    // console.log(ev.target.value);
    if (ev.target.value == '') {
      this.currentStartDate = '1970-01-01';
    } else {
      this.currentStartDate = ev.target.value;
    }
  }
  endChange(ev: any) {
    // this.currentEndDate = ev.target.value;
    if (ev.target.value == '') {
      this.currentEndDate = '2038-01-01';
    } else {
      this.currentEndDate = ev.target.value;
    }
  }
  howMuchOrdered(trips: Trip[]): [number, number] {
    let amount = 0;
    let howMuchMany = 0;
    for (let trip of trips) {
      amount += trip.howManyChose;
      howMuchMany += trip.howManyChose * trip.price;
    }
    return [amount, howMuchMany];
  }
  upClick(trip: Trip) {
    if (trip.amount - trip.howManyChose > 0) {
      trip.howManyChose++;
      this.cart.push(trip);
    }
  }
  downClick(trip: Trip) {
    if (trip.howManyChose > 0) {
      trip.howManyChose--;
      const index = this.cart.indexOf(trip);
      if (index > -1) this.cart.splice(index, 1);
    }
  }
  getMax(): number {
    let max = 0;
    for (let i = 0; i < this.tripsArray.length; i++) {
      if (
        this.tripsArray[i].price > max &&
        this.tripsArray[i].howManyChose != this.tripsArray[i].amount
      ) {
        max = this.tripsArray[i].price;
      }
    }
    return max;
  }
  getMin(): number {
    let min = 9999999999999;
    for (let i = 0; i < this.tripsArray.length; i++) {
      if (
        this.tripsArray[i].price < min &&
        this.tripsArray[i].howManyChose != this.tripsArray[i].amount
      ) {
        min = this.tripsArray[i].price;
      }
    }
    return min;
  }
  formSubmitEventHandler(trip: Trip) {
    this.tripsArray.push(trip);
    // var copy = [...this.distinctCountryArray];
    this.getDistinctCountry();
    // for (let i = 0; i < this.distinctCountryArray.length; i++) {
    //   console.log('inklud', copy.includes(this.distinctCountryArray[i]));
    // }
    // console.log(
    //   this.distinctCountryArray[this.distinctCountryArray.length - 1]
    // );
    this.currentCountryArray.push(
      this.distinctCountryArray[this.distinctCountryArray.length - 1]
    );
    console.log('trip');
  }
  remove(trip: Trip) {
    for (var i = 0; i < this.tripsArray.length; i++) {
      if (this.tripsArray[i] == trip) {
        this.tripsArray.splice(i, 1);
        return;
      }
    }
    let index = this.cart.indexOf(trip);
    while (index >= 0) {
      this.cart.splice(index, 1);
      index = this.cart.indexOf(trip);
    }
  }

  ratingEventHandler(trip: Trip, ev: any) {
    trip.amountVote++;
    trip.amountPoints += ev + 1;
  }
}