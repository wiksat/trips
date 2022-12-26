import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FireBaseServiceService } from '../../services/fire-base-service.service';
import { find, Subscription } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(public auth: AuthService, private fb: FireBaseServiceService) {}

  selectedPersistence: string = this.auth.persistenceSetting;

  users: any[] = [];
  usersSub: Subscription | undefined;

  ngOnInit(): void {
    this.usersSub = this.fb.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users) {
        var tempVal = user.payload.val() as any;
        var temp = {
          uid: user.payload.key,
          email: tempVal.email,
          roles: tempVal.roles,
        };

        this.users.push(temp);
      }
    });
  }

  ngOnDestroy(): void {
    this.usersSub?.unsubscribe();
  }

  chosenPersistence() {
    console.log(this.selectedPersistence);
    this.auth.changePersistence(this.selectedPersistence);
  }

  banUser(uid: string) {
    this.fb.changeUserRole(uid, 'banned', 'true');
  }
  setRole(uid: string, role: string, value: boolean) {
    this.fb.changeUserRole(uid, role, String(value));
  }
}
