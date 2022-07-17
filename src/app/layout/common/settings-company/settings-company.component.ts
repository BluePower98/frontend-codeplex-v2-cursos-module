import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingCompanyModalComponent } from './setting-company-modal/setting-company-modal.component';
import { SettingSucursalModalComponent } from './setting-sucursal-modal/setting-sucursal-modal.component';
import { SettingDatesModalComponent } from './setting-dates-modal/setting-dates-modal.component';
import { GlobalService } from '@services/global.service';
import { UserService } from '@services/api/user/user.service';
import { CompanyService } from '@services/api/company/company.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings-company',
  templateUrl: './settings-company.component.html',
  styleUrls: ['./settings-company.component.scss']
})
export class SettingsCompanyComponent implements OnInit, OnDestroy {

  months: Array<any> = [];
  years: Array<any> = [];
  companies: Array<any> = [];
  sucursales: Array<any> = [];
  selectedCompany: any;
  selectedSucursal: any;
  selectedMonth: any;
  selectedYear: any;

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private companyService: CompanyService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.getMonths();
    this.getYears();
    this.getCompaniesByUser();
  }

  ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  onSelectionChange(selected: string): void {
    switch (selected) {
      case 'company':
        this.openSettingCompanyModal();
        break;

      case 'sucursal':
        this.openSettingSucursalModal();
        break;

      case 'dates':
        this.openSettingDatesModal();
        break;
    
      default:
        break;
    }
  }

  openSettingCompanyModal(): void {
    const dialogConfig = this.dialog.open(SettingCompanyModalComponent, {
      autoFocus: false,
      panelClass: 'fullscreen-mat-dialog',
      disableClose: true,
      width: '700px',
      data: {
        selected: this.selectedCompany,
        companies: this.companies
      }
    });

    dialogConfig.afterOpened().subscribe(() => {
      const $dialog = document.querySelector('#' + dialogConfig.id) as HTMLElement;

      $dialog.parentElement.classList.add('enable-scrolling');
    });

    dialogConfig.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      this.selectedCompany = res.selected;
    });
  }

  openSettingSucursalModal(): void {
    const dialogConfig = this.dialog.open(SettingSucursalModalComponent, {
      autoFocus: false,
      panelClass: 'fullscreen-mat-dialog',
      disableClose: true,
      width: '700px',
      data: {
        selected: this.selectedSucursal,
        sucursales: this.sucursales
      }
    });

    dialogConfig.afterOpened().subscribe(() => {
      const $dialog = document.querySelector('#' + dialogConfig.id) as HTMLElement;

      $dialog.parentElement.classList.add('enable-scrolling');
    });

    dialogConfig.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      console.log('afterClosed - modal sucursal', res);
    });
  }

  openSettingDatesModal() {
    const dialogConfig = this.dialog.open(SettingDatesModalComponent, {
      autoFocus: false,
      panelClass: 'fullscreen-mat-dialog',
      disableClose: true,
      width: '700px',
      data: {
        months: this.months,
        years: this.years,
        selectedMonth: this.selectedMonth,
        selectedYear: this.selectedYear,
      }
    });

    dialogConfig.afterOpened().subscribe(() => {
      const $dialog = document.querySelector('#' + dialogConfig.id) as HTMLElement;

      $dialog.parentElement.classList.add('enable-scrolling');
    });

    dialogConfig.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      this.onChangeMonth(res?.selectedMonth);
      this.onChangeYear(res?.selectedYear);
    });
  }

  onChangeCompany(data: any): void {
    this.selectedCompany = data;

    const { idempresa } = data;

    // TODO: Cambiar luego el valor de "idempresa"
    // sessionStorage.setItem('idempresa', idempresa);
    sessionStorage.setItem('idempresa', '1-20539782232');
    sessionStorage.setItem('nombrerazon', data.nombrerazon);
    
    // TODO: Cambiar luego el valor de "ruc"
    // sessionStorage.setItem('ruc', data.ruc);
    sessionStorage.setItem('ruc', '20539782232');

    sessionStorage.setItem('direccion', data.direccion);
    sessionStorage.setItem('correoEmpresa', data.email);

    this.fetchSucursales(idempresa);
  }

  onChangeSucursal(data: any): void {
    this.selectedSucursal = data;

    sessionStorage.setItem('idsucursal', data.idsucursal);
    sessionStorage.setItem('sucursal', data.descripcion);
    sessionStorage.setItem('direccionSuc', data.direccionSuc)
    sessionStorage.setItem('telefonoSuc', data.telefonoSuc)
    sessionStorage.setItem('correoSuc', data.correoSuc)
    sessionStorage.setItem('distritoSuc', data.distritoSuc);
  }

  onChangeMonth(data: any) {
    this.selectedMonth = data;

    sessionStorage.setItem('idmes', data?.idmes);
  }

  onChangeYear(data: any) {
    this.selectedYear = data;

    sessionStorage.setItem('idaniopro', data?.idaniopro);
  }

  private getCompaniesByUser(): void {
    this.userService.companiesByUser$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((res: Array<any>) => {
        this.companies = res;

        if (res.length > 0) {
          this.onChangeCompany(res[0]);
        }
      });
  }

  private fetchSucursales(companyId: string): void {    
    const userId = sessionStorage.getItem('idusuario');

    this.companyService.getSucursales(companyId, userId)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((res: Array<any>) => {
        this.sucursales = res;

        if (res.length > 0) {
          this.onChangeSucursal(res[0]);
        }
      });
  }

  private getMonths(): void {
    const monthId = sessionStorage.getItem('idmes') || 0;

    this.globalService.months$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((res: Array<any>) => {
        console.log('months', res);
        this.months = res;
        let selectedMonth: any;

        if (monthId == 0) {
          const monthName = new Date().toLocaleString('es', { month: 'long' });

          selectedMonth = this.months.find(({ desmes }) => desmes === monthName) || this.months[0];
        } else {
          selectedMonth = this.months.find(({ idmes }) => idmes === monthId);
        }

        this.onChangeMonth(selectedMonth);
      });
  }

  private getYears(): void {
    const year = sessionStorage.getItem('idaniopro') || Number(new Date().getFullYear()).toString();

    this.globalService.years$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(res => {
        this.years = res;

        this.onChangeYear({idaniopro: year});
      });
  }

}
