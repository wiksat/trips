import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TripComponent } from './components/trip/trip.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { InfoComponent } from './components/info/info.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ModifyComponent } from './components/modify/modify.component';
import { AdminGuard } from './guard/admin.guard';
import { ManagerGuard } from './guard/manager.guard';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
const routes: Routes = [
  { path: 'trips', component: TripComponent },
  { path: 'trips/:id', component: SingleTripComponent },
  // { path: 'add', component: AddTripComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signUp', component: SignupComponent },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'manager', component: ManagerComponent, canActivate: [ManagerGuard] },
  {
    path: 'modify/:id',
    component: ModifyComponent,
    canActivate: [ManagerGuard],
  },
  { path: '', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
