import { Component, OnInit } from '@angular/core';
import { JsonGetService } from 'src/app/services/json-get.service';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
import { Trip } from '../../ITrip';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  tripsArray: Trip[];
  constructor(
    private service: JsonGetService,
    private fb: FireBaseServiceService
  ) {}

  ngOnInit(): void {
    this.fb.getData().subscribe((res: any) => {
      // console.log(res);
      this.tripsArray = res;
    });
  }
  remove(trip: Trip) {
    this.fb.removeTrip(trip.id);
  }
}
