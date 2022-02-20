import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient){
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );

    // }
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [] ;
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [] ;

  }

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

      localStorage.setItem('historial', JSON.stringify(this._historial))

    }

    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', query)
            .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${environment.BASE_URL_GIPHY}/search`, {params})
          .subscribe((resp: any) => {
            console.log(resp);
            this.resultados = resp.data
            localStorage.setItem('resultados', JSON.stringify(this.resultados));

          })

  }
}
