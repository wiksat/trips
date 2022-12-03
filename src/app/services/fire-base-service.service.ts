import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, map, Observable } from 'rxjs';
import { Trip } from '../ITrip';
@Injectable({
  providedIn: 'root',
})
export class FireBaseServiceService {
  daneRef: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.daneRef = this.db.list('data').valueChanges();
    // console.log(this.db.list('data'));
  }
  getData(): Observable<any[]> {
    // console.log(this.daneRef);
    return this.daneRef;
  }
}
