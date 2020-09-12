import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { InfoProducto } from '../../interfaces/info-producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  anio: number = new Date().getFullYear();
  producto: InfoProducto;
  productoId: string;

  constructor( private route: ActivatedRoute,
               public productosService: ProductosService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( parametros => {
        this.productosService.getProducto(parametros['id'])
          .subscribe( (producto: InfoProducto) => {
            this.productoId = parametros['id'];
            this.producto = producto;
            // console.log(producto);
          })
      });
  }

}
