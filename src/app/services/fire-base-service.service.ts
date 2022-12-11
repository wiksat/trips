import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, map, Observable } from 'rxjs';
import { Trip } from '../ITrip';

@Injectable({
  providedIn: 'root',
})
export class FireBaseServiceService {
  daneRef: Observable<any[]>;
  private nextId: any;

  constructor(private db: AngularFireDatabase) {
    this.daneRef = this.db.list('data').valueChanges();
    this.db
      .list('data', (ref) => ref.orderByChild('id').limitToLast(1))
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        if (res[0] != undefined) {
          this.nextId = res[0].id + 1;
        } else {
          this.nextId = res.id + 1;
        }

        // console.log(this.nextId);
      });
  }
  getData(): Observable<any[]> {
    return this.daneRef;
  }
  getNextid() {
    return this.nextId;
  }
  updateRate(id: number, amountVote: number, amountPoints: number) {
    this.db
      .list('data')
      .snapshotChanges()
      .pipe(first())
      .subscribe((res: any) => {
        for (let i of res) {
          if (i.payload.val().id == id) {
            // console.log(i.payload.key)
            this.db
              .list('data')
              .update(i.payload.key, { amountPoints: amountPoints });
            this.db
              .list('data')
              .update(i.payload.key, { amountVote: amountVote });
          }
        }
      });
    return;
  }
  addTrip(trip: Trip) {
    this.db.list('data').push({
      id: trip.id,
      name: trip.name,
      amount: trip.amount,
      amountPoints: trip.amountPoints,
      amountVote: trip.amountVote,
      country: trip.country,
      currency: trip.currency,
      endDate: trip.endDate,
      img: trip.img,
      price: trip.price,
      startDate: trip.startDate,
    });
  }
  removeTrip(id: number) {
    // console.log(id);
    this.db
      .list('data')
      .snapshotChanges()
      .pipe(first())
      .subscribe((res: any) => {
        // console.log(res);
        for (let i of res) {
          if (i.payload.val().id == id) {
            // console.log(i.payload.key);
            this.db.list('data').remove(i.payload.key);
          }
        }
      });
  }
}
