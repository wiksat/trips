import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Review } from '../../IReview';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  errors = [];
  // showError = false;
  clicked = false;
  // showOk = false;
  constructor() {}
  @Output() newReviewEvent = new EventEmitter<Review>();
  ngOnInit(): void {}

  tripReview = new FormGroup({
    nick: new FormControl('', [Validators.required, Validators.minLength(1)]),
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
      nick: this.tripReview.get('nick')!.value,
      name: this.tripReview.get('name')!.value,
      review: this.tripReview.get('review')!.value,
      date: this.tripReview.get('date')!.value,
    } as Review;
    this.newReviewEvent.emit(newReview);
    this.tripReview.reset();

    // this.showError = false;
    // this.showOk = true;
  }
}
