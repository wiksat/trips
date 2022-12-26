import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, map, Observable, firstValueFrom } from 'rxjs';
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
  update(trip: Trip, id: number) {
    console.log('odpala update');

    this.db
      .list('data')
      .snapshotChanges()
      .pipe(first())
      .subscribe((res: any) => {
        for (let i of res) {
          if (i.payload.val().id == id) {
            console.log('wyslano');
            this.db.list('data').update(i.payload.key, { name: trip.name });
            this.db.list('data').update(i.payload.key, { img: trip.img });
            this.db
              .list('data')
              .update(i.payload.key, { country: trip.country });
            this.db.list('data').update(i.payload.key, { amount: trip.amount });
            this.db
              .list('data')
              .update(i.payload.key, { startDate: trip.startDate });
            this.db
              .list('data')
              .update(i.payload.key, { endDate: trip.endDate });
            this.db.list('data').update(i.payload.key, { desc: trip.desc });
            this.db.list('data').update(i.payload.key, { price: trip.price });
            this.db
              .list('data')
              .update(i.payload.key, { currency: trip.currency });
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
  addNewUser(user: any) {
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles,
      history: [],
      cart: [],
    });
  }
  changeUserRole(uid: string, role: string, value: string) {
    let change = '{"' + role + '"' + ':' + value + '}';
    this.db.object('/users/' + uid + '/roles').update(JSON.parse(change));
  }
  async getUserRoles(uid: string) {
    return firstValueFrom(
      this.db.object('/users/' + uid + '/roles').valueChanges()
    );
  }
  getOrderHistory(uid: string) {
    return this.db.object('/users/' + uid + '/history').valueChanges();
  }
  // setOrderHistory(uid: string) {
  // try{
  //   this.db.list('/users/' + uid + '/history').push({items: items, date: new Date().toLocaleDateString()})
  // }
  // catch (err){
  //   window.alert(err)
  // }
  // }
  buy(uid: string, trips: string[]) {
    this.db
      .list('/users/' + uid + '/history')
      .push({ trips: trips, date: new Date().toLocaleDateString() });
  }
  getCart(uid: string) {
    return this.db.object('/users/' + uid + '/cart').valueChanges();
  }
  setCart(uid: string, cart: Array<any>) {
    this.db.object('/users/' + uid + '/cart').remove();
    this.db.object('/users/' + uid + '/cart').update(cart);
  }
  getUsers() {
    return this.db.list('users').snapshotChanges();
  }
}
