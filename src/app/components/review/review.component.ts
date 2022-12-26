import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Review } from '../../IReview';
import { AuthService } from '../../services/auth.service';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Input() czy = false;
  userData: any = null;
  userRoles: any = null;
  errors = [];
  // showError = false;
  clicked = false;
  // showOk = false;
  constructor(public auth: AuthService, private fb: FireBaseServiceService) {}
  @Output() newReviewEvent = new EventEmitter<Review>();
  async ngOnInit(): Promise<void> {
    const authenticated = await this.auth.getUserData();
    this.userData = authenticated as any;
    const authenticated2 = await this.auth.getCurrentUser();
    var temp = authenticated2 as any;
    const roles = await this.fb.getUserRoles(temp.uid);
    this.userRoles = roles as any;
    // console.log(this.userRoles);
  }

  tripReview = new FormGroup({
    // nick: new FormControl('', [Validators.required, Validators.minLength(1)]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    review: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500),
    ]),
    date: new FormControl('', []),
  });

  submitForm() {
    this.clicked = true;
    if (!this.tripReview.valid) {
      return;
    }
    let newReview = {
      nick: this.userData.email,
      name: this.tripReview.get('name')!.value,
      review: this.tripReview.get('review')!.value,
      date: this.tripReview.get('date')!.value,
    } as Review;
    this.newReviewEvent.emit(newReview);
    this.tripReview.reset();
  }
}
