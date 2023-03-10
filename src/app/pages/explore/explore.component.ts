import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from "../../shared/services/movies.service";

@Component({
  selector: 'tp-fil-rouge-explore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [MoviesService]
})
export class ExploreComponent {
}
