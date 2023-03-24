import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'tp-fil-rouge-profile-details-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details-reviews.component.html',
  styleUrls: ['./profile-details-reviews.component.scss'],
})
export class ProfileDetailsReviewsComponent implements OnInit {
  @Input() user?: User;

  constructor(
    private route: ActivatedRoute,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    if (this.user) {
      console.log(this.user);
    }
  }
}
