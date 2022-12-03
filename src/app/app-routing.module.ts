import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TripComponent } from './components/trip/trip.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { AboutComponent } from './components/about/about.component';
const routes: Routes = [
  { path: 'trips', component: TripComponent },
  { path: 'trips/:id', component: SingleTripComponent },
  // {path: 'addnewdish', component: DishAddComponent},
  // {path: 'cart', component: AboutComponent},
  { path: 'about', component: AboutComponent },
  { path: '', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
