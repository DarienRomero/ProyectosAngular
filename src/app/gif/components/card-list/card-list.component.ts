import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  constructor(
    private readonly gifsService: GifsService
  ){
    
  }
  get gifsList(): Gif[] {
    return this.gifsService.gifsList;
  }
}
