import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from '@services/ui/sweet-alert.service';
import { ToastNotificationService } from '@services/ui/toast-notification.service';
import { ProductsModalComponent } from './components/products-modal/products-modal.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductService } from '@services/api/product/product.service';
import { ProductsFiltersComponent } from './components/products-filters/products-filters.component';
import { LoadingController } from '@controllers/loading.controller';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(ProductsListComponent, {static: false}) productsListComponent: ProductsListComponent
  @ViewChild(ProductsFiltersComponent, {static: false}) productsFiltersComponent: ProductsFiltersComponent

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private sweetAlertService: SweetAlertService,
    private toastNotificationService: ToastNotificationService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit(): void {
  }

  add(): void {
    const { productTypeId } = this.productsFiltersComponent.form.value;

    this.openModalForm({
      title: 'Registrar',
      edit: false,
      productTypeIdSelected: productTypeId,
    });
  }

  onEdit(data: any): void {
    const { idempresa, idproducto } = data;

    const loading = this.loadingCtrl.create();

    loading.present();

    this.productService.getProductById(idempresa, idproducto)
      .pipe(
        finalize(() => loading.dismiss())
      )
      .subscribe(res => {
        this.openModalForm({
          title: 'Editar',
          edit: true,
          item: res,
        });
      });
  }

  onDelete(data: any): void {
    const { idempresa, idproducto } = data;

    const loading = this.loadingCtrl.create();

    loading.present();

    this.productService.validarEliminacion(idempresa, idproducto)
      .pipe(
        finalize(() => loading.dismiss())
      )
      .subscribe(res => {
        if (res) {
          let message: string = '';

          res.forEach((value: any) => {
            message = message + value.mensaje + '.\n';
          });

          this.sweetAlertService.error(message);

          return;
        }

        this.showAlertDeleteProduct(data);
      });
  }

  private showAlertDeleteProduct(data: any): void {
    this.sweetAlertService.confirm(
      'Estás seguro que quieres eliminar el producto seleccionado?',
      { title:  'Eliminar producto'}
    ).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.deleteProduct(data);
      }
    });
  }

  private deleteProduct(data: any): void {
    const {idempresa, idproducto} = data;

    this.productService.DeleteProductos(idempresa, idproducto)
      .subscribe(res => {
        this.toastNotificationService.success(res.message);
        this.productsListComponent.reloadTable(true);
      });
  }

  private openModalForm(data: any): void {
    const dialogConfig = this.dialog.open(ProductsModalComponent, {
      autoFocus: false,
      panelClass: 'fullscreen-mat-dialog',
      disableClose: true,
      width: '1350px',
      data
    });

    dialogConfig.afterOpened().subscribe(() => {
      const $dialog = document.querySelector('#' + dialogConfig.id) as HTMLElement;

      $dialog.parentElement.classList.add('enable-scrolling');
    });

    dialogConfig.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      this.productsListComponent.reloadTable(res.resetPaging);
    });
  }

}
