import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Trip } from '../../ITrip';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'],
})
export class AddTripComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() formSubmitEvent = new EventEmitter<Trip>();

  tripAddForm = new FormGroup({
    tripName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    tripCountry: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    tripAmount: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.min(1),
    ]),
    tripStartDate: new FormControl('', [Validators.required]),
    tripEndDate: new FormControl('', [Validators.required]),
    tripPrice: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*'),
    ]),
    tripDesc: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    tripImg: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    tripCurrency: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  showError = false;
  showOk = false;
  submitForm() {
    console.log(this.tripAddForm);
    console.log(this.tripAddForm.valid);
    if (!this.tripAddForm.valid) {
      this.showError = true;
      return;
    }
    let newTrip: Trip = {
      img: this.tripAddForm.get('tripImg')!.value!,
      name: this.tripAddForm.get('tripName')!.value!,
      country: this.tripAddForm.get('tripCountry')!.value!,
      amount: parseInt(this.tripAddForm.get('tripAmount')!.value!),
      startDate: this.tripAddForm.get('tripStartDate')!.value!,
      endDate: this.tripAddForm.get('tripEndDate')!.value!,
      desc: this.tripAddForm.get('tripDesc')!.value!,
      price: parseInt(this.tripAddForm.get('tripPrice')!.value!),
      howManyChose: 0,
      currency: this.tripAddForm.get('tripCurrency')!.value!,
      amountPoints: 0,
      amountVote: 0,
    };
    console.log(newTrip);
    this.formSubmitEvent.emit(newTrip);
    this.showError = false;
    this.showOk = true;
    this.tripAddForm.reset();
  }
}
