import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient){}

  private _historial: string[] = [];
  private _apiKey: string = '6VqF6JW0KcdXwmM4ytotEngefqY10GZr';

  // TODO: cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  get apiKey() {
    return this._apiKey;
  }

  buscarGifs( query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if (! this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
          .subscribe((resp: any) => {
            console.log(resp);
            this.resultados = resp.data
          })

  }
}
