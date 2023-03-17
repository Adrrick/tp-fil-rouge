import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import User from 'src/app/models/User';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'tp-fil-rouge-user-line',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './user-line.component.html',
  styleUrls: ['./user-line.component.scss'],
})
export class UserLineComponent {
  @Input() user!: User


}
