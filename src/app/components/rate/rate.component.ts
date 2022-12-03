import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {
  constructor() {}
  @Output() ratingChanged = new EventEmitter<number>();

  @Input() amountPoints = 0;
  @Input() amountVote = 0;

  ocena: number = this.amountPoints / this.amountVote;
  imgSrc: number = this.amountPoints / this.amountVote;
  alreadyVoted = false;
  ngOnInit(): void {
    this.imgSrc = this.amountPoints / this.amountVote;
    // console.log(this.imgSrc);
  }
  rattingApplied(number: number) {
    if (this.alreadyVoted) return;
    this.ratingChanged.emit(number);
    // console.log(number);
    this.alreadyVoted = true;
  }
}
