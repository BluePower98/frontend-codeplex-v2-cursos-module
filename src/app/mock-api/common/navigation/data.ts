import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboard.home',
                title: 'Inicio',
                type: 'basic',
                link: '/dashboard'
            },
            {
                id: 'dashboard.example',
                title: 'Example',
                type: 'basic',
                link: '/dashboard/example'
            },
        ]
    },
    {
        id: 'plugins',
        title: 'Plugins',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'plugins.datatables',
                title: 'Datatables',
                type: 'basic',
                link: '/dashboard/plugins/datatables'
            },
            {
                id: 'plugins.dropzone',
                title: 'Dropzone Wrapper',
                type: 'basic',
                link: '/dashboard/plugins/dropzone-wrapper'
            },
            {
                id: 'plugins.ng2-select',
                title: 'Ng2 Select',
                type: 'basic',
                link: '/dashboard/plugins/ng2-select'
            },
            {
                id: 'plugins.ng-autocomplete',
                title: 'Ng Autocomplete',
                type: 'basic',
                link: '/dashboard/plugins/ng-autocomplete'
            },
        ]
    },
    {
        id: 'forms',
        title: 'Forms',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'forms.fields',
                title: 'Fields',
                type: 'basic',
                link: '/dashboard/forms/fields'
            },
        ]
    },
    {
        id: 'maintainers',
        title: 'Mantenedores',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'maintainers.products',
                title: 'Productos',
                type: 'basic',
                link: '/dashboard/maintainers/products'
            },
            {
                id: 'maintainers.list-prices',
                title: 'Lista de Precios',
                type: 'basic',
                link: '/dashboard/maintainers/list-prices'
            },
            {
                id: 'maintainers.inventories',
                title: 'Inventarios',
                type: 'basic',
                link: '/dashboard/maintainers/inventories'
            },
            {
                id: 'maintainers.document-types',
                title: 'Tipo documentos',
                type: 'basic',
                link: '/dashboard/maintainers/document-types'
            },
            {
                id: 'maintainers.sellers',
                title: 'Vendedores',
                type: 'basic',
                link: '/dashboard/maintainers/sellers'
            },
            {
                id: 'maintainers.equipments',
                title: 'Equipos',
                type: 'basic',
                link: '/dashboard/maintainers/equipments'
            },
        ]
    }
];
