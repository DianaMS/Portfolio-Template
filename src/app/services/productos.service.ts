import { Injectable } from '@angular/core';
import { InfoItem } from '../interfaces/info-item.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  itemProduct: InfoItem[] = [];
  productoFiltrado: InfoItem[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();

   }

  private cargarProductos(): any{
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-2e649.firebaseio.com/productos_idx.json')
      .subscribe((resp: InfoItem[]) => {
        this.itemProduct = resp;
        this.cargando = false;
        resolve();
        console.log('itemProducto', this.itemProduct)
    });
      });
  }

  getProducto( id: string ): any {
    return this.http.get(`https://angular-html-2e649.firebaseio.com/productos/${ id }.json`);
  }

  searchProduct( termino: string): any {

    if (this.itemProduct.length === 0 ) {
      // Cargar Productos
      this.cargarProductos().then(() => {
        // Ejecutar despues de tener los productos
        // Aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      // Aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string): any {
    termino = termino.toLowerCase();
    this.productoFiltrado = this.itemProduct.filter(producto => {
      const tituloLower = producto.titulo.toLowerCase();
      const categoriaLower = producto.categoria.toLowerCase();

      return categoriaLower.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0;
    });
    console.log(this.productoFiltrado);
  }
}

