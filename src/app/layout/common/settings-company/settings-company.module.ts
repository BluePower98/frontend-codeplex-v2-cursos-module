import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCompanyComponent } from './settings-company.component';
// import { MatListModule } from '@angular/material/list';
import { SettingCompanyModalComponent } from './setting-company-modal/setting-company-modal.component';
/* import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; */
import { SettingDatesModalComponent } from './setting-dates-modal/setting-dates-modal.component';
import { SettingSucursalModalComponent } from './setting-sucursal-modal/setting-sucursal-modal.component';
/* import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field'; */
import { MaterialModule } from '@components/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [
    SettingsCompanyComponent,
    SettingCompanyModalComponent,
    SettingDatesModalComponent,
    SettingSucursalModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    AutocompleteLibModule,
    PipesModule
    /* MatListModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatRadioModule,
    MatFormFieldModule */
  ],
  exports: [
    SettingsCompanyComponent
  ]
})
export class SettingsCompanyModule { }
