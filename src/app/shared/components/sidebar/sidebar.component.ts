import { Component } from '@angular/core';
import { GifsService } from '../../../gif/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private readonly gifsService: GifsService
  ){

  }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  onSelect(tag: string){
    this.gifsService.searchTag(tag);
  }
}
