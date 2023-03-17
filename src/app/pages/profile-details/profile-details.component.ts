import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import User from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MatCardModule } from '@angular/material/card';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'tp-fil-rouge-profile-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  user$?: Observable<User | undefined>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || this.storageService.getUID();
    if (id) {
      this.user$ = this.userService.getUserByUID(id);
    }
  }
}