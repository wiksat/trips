import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Trip } from '../../ITrip';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  private subscription: Subscription | undefined;
  id: number = -1;
  dish: Trip[] = [];

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
