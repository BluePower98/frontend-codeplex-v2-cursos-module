import { Routes } from '@angular/router';

export const MAINTAINERS_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'Productos',
        pathMatch: 'full',
    },
    {
        path: 'Productos',
        loadChildren: (): any => import('./products/products.module').then(m => m.ProductsModule),
        data: {
            preload: true
        }
    },
    {
        path: 'Lista de Precios',
        loadChildren: (): any => import('./prices/prices.module').then(m => m.PricesModule),
        data: {
            preload: true
        }
    },
    {
        path: 'Inventarios',
        loadChildren: (): any => import('./inventories/inventories.module').then(m => m.InventoriesModule),
        data: {
            preload: true
        }
    },
    {
        path: 'Tipo Documentos',
        loadChildren: (): any => import('./document-types/document-types.module').then(m => m.DocumentTypesModule),
        data: {
            preload: true
        }
    },
    {
        path: 'Vendedores',
        loadChildren: (): any => import('./sellers/sellers.module').then(m => m.SellersModule),
        data: {
            preload: true
        }
    },
    {
        path: 'Equipos',
        loadChildren: (): any => import('./equipments/equipments.module').then(m => m.EquipmentsModule),
        data: {
            preload: true
        }
    },
    {
        path: 'Proveedores',
        loadChildren: (): any => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule),
        data: {
            preload: true
        }
    },
    {
        path: 'cursos',
        loadChildren: (): any => import('./cursos/cursos.module').then(m => m.CursosModule),
        data: {
            preload: true
        }
    }
];