import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';

import {RegistrationComponent} from './views/users/registration/registration.component'
import {UsersListComponent} from './views/users/list/userslist.component' 
import {EditUserComponent} from './views/users/edit/edituser.component' 
import { SaveProductComponent } from './views/products/save/saveProduct.component';
import { ProductsListComponent } from './views/products/list/productslist.component';

import {DashboardComponent} from './views/dashboard/dashboard.component'
import { PayProductComponent } from './views/products/pay/payProduct.component';
import { PayResultProductComponent } from './views/products/pay/result/payResultProduct.component';
import { CustomComponent } from './views/custom/custom.component';

export const routes: Routes = [
    {path: '', component: ProductsListComponent},
    //{path: '', component: DashboardDemoComponent},
    //{path: '', component: DashboardComponent},
    {path: 'sample', component: SampleDemoComponent},

    {path: 'users/registration', component: RegistrationComponent},
    {path: 'users/list', component: UsersListComponent},
    {path: 'users/edit/:email', component: EditUserComponent},

    {path: 'products/save' , component: SaveProductComponent},
    {path: 'products/save/:id' , component: SaveProductComponent},
    {path: 'products/list', component: ProductsListComponent},
    {path: 'products/pay/:id', component: PayProductComponent},
    {path: 'products/result/:state', component: PayResultProductComponent},

    {path: 'custom', component: CustomComponent},
 
    {path: 'forms', component: FormsDemoComponent},
    {path: 'data', component: DataDemoComponent},
    {path: 'panels', component: PanelsDemoComponent},
    {path: 'overlays', component: OverlaysDemoComponent},
    {path: 'menus', component: MenusDemoComponent},
    {path: 'messages', component: MessagesDemoComponent},
    {path: 'misc', component: MiscDemoComponent},
    {path: 'empty', component: EmptyDemoComponent},
    {path: 'charts', component: ChartsDemoComponent},
    {path: 'file', component: FileDemoComponent},
    {path: 'utils', component: UtilsDemoComponent},
    {path: 'documentation', component: DocumentationComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
