import { Injectable } from '@angular/core';
import { InfoItem } from '../interfaces/info-item.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  itemProduct: InfoItem[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();

   }

  private cargarProductos(): void {
    this.http.get('https://angular-html-2e649.firebaseio.com/productos_idx.json')
      .subscribe((resp: InfoItem[]) => {
        this.itemProduct = resp;
        this.cargando = false;
        console.log('itemProducto', this.itemProduct)

      });
  }

  getProducto( id: string ): any {
    return this.http.get(`https://angular-html-2e649.firebaseio.com/productos/${ id }.json`);
  }
}

