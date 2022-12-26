import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {
  constructor(public auth: AuthService) {}
  @Output() ratingChanged = new EventEmitter<number>();

  @Input() amountPoints = 0;
  @Input() amountVote = 0;
  @Input() czy = false;

  ocena: number = this.amountPoints / this.amountVote;
  imgSrc: number = this.amountPoints / this.amountVote;
  alreadyVoted = false;

  ngOnInit(): void {
    this.imgSrc = this.amountPoints / this.amountVote;
  }
  rattingApplied(number: number) {
    if (this.auth.userRoles.banned || this.czy) {
      return;
    }
    if (this.alreadyVoted) return;
    this.ratingChanged.emit(number);
    // console.log(number);
    this.alreadyVoted = true;
  }
}
