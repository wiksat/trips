import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Trip } from '../../ITrip';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
import { first, Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {
  currentTrip: Trip;
  private subscription: Subscription | undefined;
  id: number = -1;
  tripAddForm = new FormGroup({
    tripName: new FormControl('', [
      // Validators.required,
      // Validators.minLength(1),
    ]),
    tripCountry: new FormControl('', [
      // Validators.required,
      // Validators.minLength(1),
    ]),
    tripAmount: new FormControl('', [
      // Validators.required,
      // Validators.pattern('[0-9]*'),
      // Validators.min(1),
    ]),
    tripStartDate: new FormControl('', []),
    tripEndDate: new FormControl('', []),
    tripPrice: new FormControl('', [
      // Validators.required,
      // Validators.min(1),
      // Validators.pattern('[0-9]*'),
    ]),
    tripDesc: new FormControl('', [
      // Validators.required,
      // Validators.minLength(1),
    ]),
    tripImg: new FormControl('', [
      // Validators.required,
      // Validators.minLength(1),
    ]),
    tripCurrency: new FormControl('', [
      // Validators.required,
      // Validators.minLength(1),
    ]),
  });

  showError = false;
  showOk = false;
  @ViewChild('name') name: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('amount') amount: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;
  @ViewChild('price') price: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('img') img: ElementRef;
  @ViewChild('currency') currency: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private fb: FireBaseServiceService,
    private router: Router
  ) {}
  set() {
    // console.log(this.abc);
    this.name.nativeElement.value = this.currentTrip.name;
    this.country.nativeElement.value = this.currentTrip.country;
    this.amount.nativeElement.value = this.currentTrip.amount;
    this.startDate.nativeElement.value = this.currentTrip.startDate;
    this.endDate.nativeElement.value = this.currentTrip.endDate;
    this.price.nativeElement.value = this.currentTrip.price;
    this.desc.nativeElement.value = this.currentTrip.desc;
    this.img.nativeElement.value = this.currentTrip.img;
    this.currency.nativeElement.value = this.currentTrip.currency;
  }
  submitForm() {
    if (!this.tripAddForm.valid) {
      this.showError = true;
      return;
    }
    console.log(this.tripAddForm.get('tripName')?.dirty);
    console.log(this.tripAddForm.get('tripStartDate')?.dirty);
    let newTrip: Trip = {
      id: this.currentTrip.id,
      img: this.tripAddForm.get('tripImg')?.dirty
        ? this.tripAddForm.get('tripImg')!.value!
        : this.currentTrip.img,
      name: this.tripAddForm.get('tripName')?.dirty
        ? this.tripAddForm.get('tripName')!.value!
        : this.currentTrip.name,
      country: this.tripAddForm.get('tripCountry')?.dirty
        ? this.tripAddForm.get('tripCountry')!.value!
        : this.currentTrip.country,
      amount: this.tripAddForm.get('tripAmount')?.dirty
        ? parseInt(this.tripAddForm.get('tripAmount')!.value!)
        : this.currentTrip.amount,
      startDate: this.tripAddForm.get('tripStartDate')?.dirty
        ? this.tripAddForm.get('tripStartDate')!.value!
        : this.currentTrip.startDate,
      endDate: this.tripAddForm.get('tripEndDate')?.dirty
        ? this.tripAddForm.get('tripEndDate')!.value!
        : this.currentTrip.endDate,
      desc: this.tripAddForm.get('tripDesc')?.dirty
        ? this.tripAddForm.get('tripDesc')!.value!
        : this.currentTrip.desc,
      price: this.tripAddForm.get('tripPrice')?.dirty
        ? parseInt(this.tripAddForm.get('tripPrice')!.value!)
        : this.currentTrip.price,
      howManyChose: 0,
      currency: this.tripAddForm.get('tripCurrency')?.dirty
        ? this.tripAddForm.get('tripCurrency')!.value!
        : this.currentTrip.currency,
      amountPoints: 0,
      amountVote: 0,
    };
    try {
      console.log(newTrip);
      this.fb.update(newTrip, newTrip.id);
    } catch (err) {
      window.alert(err);
    }
    this.showError = false;
    this.showOk = true;

    this.router.navigate(['/manager']);
  }
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.fb
        .getData()
        .pipe(first())
        .subscribe((trips: any[]) => {
          let trip: any;
          for (let d of trips) {
            if (d.id == this.id) {
              trip = d;
              break;
            }
          }
          this.currentTrip = trip;
          this.set();
        });
    });
  }
}
