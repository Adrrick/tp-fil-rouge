import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'tp-fil-rouge-bottom-navbar-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './bottom-navbar-item.component.html',
  styleUrls: ['./bottom-navbar-item.component.scss'],
})
export class BottomNavbarItemComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() path!: string;
}
