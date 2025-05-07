import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            // implement lazy loading for shop and cart components
            { path: 'shop', loadComponent: () => import('./shop/shop.component').then(m => m.ShopComponent)},
            { path: 'cart', loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
        ],
    },
    { path: '**', redirectTo: '/login' }
];

