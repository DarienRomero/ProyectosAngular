import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  
  constructor(
    private readonly gifsService: GifsService
  ){

  }
  searchTag(){
    const value = this.tagInput.nativeElement.value;
    if(!Boolean(value.length)) return;
    this.gifsService.searchTag(value);
    this.tagInput.nativeElement.value = "";
  }
}
