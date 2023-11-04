import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.interface";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class GifsService {
    public gifsList: Gif[] = [];
    private _tagsHistory: string[] = [];
    private apiKey:       string = 'qiRipvK01aSbG1EB37jOaZ85JzaMc7Ao';
    private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient){
        const savedValues = this.getFromLocalStorage();
        this._tagsHistory = savedValues;
        if(Boolean(savedValues.length)){
            this.searchTag(savedValues[0]);
        }
    }

    get tagsHistory(){
        return this._tagsHistory;
    }
    saveToLocalStorage(values: string[]){
        localStorage.setItem("history", JSON.stringify(values))
    }
    getFromLocalStorage(): string[] {
        const raw = localStorage.getItem("history");
        if(!raw){
            return [];
        }
        const values: string[] = JSON.parse(raw);
        console.log(values);
        return values;
    }
    searchTag(tag: string){
        const oldtagsHistory = this.tagsHistory.filter(e => e !== tag);
        oldtagsHistory.unshift(tag);
        this._tagsHistory = oldtagsHistory;
        this.saveToLocalStorage(this._tagsHistory);

        const params = new HttpParams()
        .set('api_key', this.apiKey )
        .set('limit', '10' )
        .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifsList = resp.data;
        // console.log({ gifs: this.gifList });

      });
        
    }
}