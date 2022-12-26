import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FireBaseServiceService } from '../../services/fire-base-service.service';
import { first } from 'rxjs';
import { Trip } from '../../ITrip';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  constructor(public auth: AuthService, public fb: FireBaseServiceService) {}
  history: any | undefined;
  tripsArray: Trip[];
  ngOnInit(): void {
    this.fb
      .getOrderHistory(this.auth.userData.uid)
      .pipe(first())
      .subscribe((data: any) => {
        if (data) {
          this.history = Object.values(data);
          console.log(this.history);
        }
      });
    this.fb.getData().subscribe((res: any) => {
      this.tripsArray = res;
    });
  }

  getNames(orderId: string) {
    for (let i = 0; i < this.tripsArray.length; i++) {
      if (parseInt(orderId) == this.tripsArray[i].id) {
        return this.tripsArray[i].name;
      }
    }
    return null;
  }
}
