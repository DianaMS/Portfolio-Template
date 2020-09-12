import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: InfoEquipo[] = [];

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(): void {
    this.http.get('assets/data/data-page.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(resp.email);
    });
  }

  private cargarEquipo(): void {
    this.http.get('https://angular-html-2e649.firebaseio.com/equipo.json')
      .subscribe( (resp: InfoEquipo[]) => {
        this.equipo = resp;
        // console.log(resp);
      });
  }
}
