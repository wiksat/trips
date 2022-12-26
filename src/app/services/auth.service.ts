import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { FireBaseServiceService } from './fire-base-service.service';
import { first, map, Observable, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userRoles: {
    guest: true;
    admin: false;
    menager: false;
    client: false;
    banned: false;
  };
  persistenceSetting: string = 'local';
  userData: any = null;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FireBaseServiceService,
    private cart: CartService
  ) {
    afAuth.authState.subscribe(async (ev: any) => {
      if (ev) {
        this.userData = ev;
        const roles = await this.fb.getUserRoles(ev?.uid);
        this.userRoles = roles as any;
      } else {
        this.userData = null;
        this.userRoles = {
          guest: true,
          admin: false,
          menager: false,
          client: false,
          banned: false,
        };
      }
    });
  }
  changePersistence(newSetting: string) {
    this.persistenceSetting = newSetting;
    console.log('nowa', this.persistenceSetting);
  }
  login(email: string, pass: string) {

    return this.afAuth.setPersistence(this.persistenceSetting).then((_) => {
      return this.afAuth
        .signInWithEmailAndPassword(email, pass)
        .then((ev) => {
          this.router.navigate(['info']);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {

        let roles = {
          client: true,
          guest: true,
          menager: false,
          admin: false,
          banned: false,
        };


        this.fb.addNewUser({
          uid: res.user?.uid,
          email: res.user?.email,
          roles: roles,
        });
        window.alert("Zarejestrowano pomyślnie");
        this.router.navigate(['info']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }
  getUserData() {

    return new Promise((resolve, reject) => {
      const unsubscribe = this.afAuth.onAuthStateChanged((user) => {
        resolve(this.userData);
      }, reject);
    });
  }
  getUserRoles() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.afAuth.onAuthStateChanged((user) => {
        resolve(this.userRoles);
      }, reject);
    });
  }
  getCurrentUserData() {
    return this.afAuth.currentUser;
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.afAuth.onAuthStateChanged((user) => {
        resolve(user);
      }, reject);
    });
  }
  signOut() {
    return this.afAuth.signOut().then((ev) => {
      this.cart.setCart([]);

      this.router.navigate(['']);
    });
  }
}
