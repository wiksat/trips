import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Trip } from '../../ITrip';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private fb: FireBaseServiceService,
    public auth: AuthService
  ) {}
  tripsArray: Trip[];
  ngOnInit(): void {
    this.fb.getData().subscribe((res: any) => {
      // console.log(res);
      this.tripsArray = res;
    });
  }

  ile() {
    return this.cartService.getCartAmount();
  }
  ile2() {
    return this.cartService.getCartCost();
  }
  isTime() {
    var comp = 0;
    for (let i = 0; i < this.tripsArray.length; i++) {
      var data = this.tripsArray[i].startDate;
      data = data.split('-');
      var tempDate = new Date(data[0] + '/' + data[1] + '/' + data[2]);

      var prevWeek = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        tempDate.getDate() - 30
      );
      // console.log(tempDate);
      // console.log(prevWeek);

      var currentDate = new Date();
      // console.log(currentDate);
      if (prevWeek < currentDate && tempDate > currentDate) {
        comp = 1;
        return true;
      }
    }
    return false;
  }
}
