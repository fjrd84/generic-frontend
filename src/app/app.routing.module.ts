import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main-components/home/home.component';
import { AuthComponent } from './main-components/auth/auth.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth/:authToken', component: AuthComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }