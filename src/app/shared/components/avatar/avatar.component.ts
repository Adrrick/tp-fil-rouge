import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'; import { RouterLink } from '@angular/router';


@Component({
  selector: 'tp-fil-rouge-avatar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() avatarImage!: string

  menuItems = [
    { icon: "person", label: "Profile", link: 'profile' },
    { icon: "exit_to_app", label: "Logout", link: 'logout' }
  ]

}
