import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { UnauthorizedComponent } from 'app/pages/unauthorized/unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';

@NgModule({
    declarations: [
        UnauthorizedComponent
    ],
    imports: [
        UnauthorizedRoutingModule,
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class UnauthorizedtModule
{
}
