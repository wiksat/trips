import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TripComponent } from './components/trip/trip.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RateComponent } from './components/rate/rate.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FiltrationPipe } from './pipes/filtration.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { AboutComponent } from './components/about/about.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ReviewComponent } from './components/review/review.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { InfoComponent } from './components/info/info.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ModifyComponent } from './components/modify/modify.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    CurrencyPipe,
    AddTripComponent,
    RateComponent,
    FiltrationPipe,
    NavbarComponent,
    PageNotFoundComponent,
    HomePageComponent,
    SingleTripComponent,
    AboutComponent,
    ReviewComponent,
    CartComponent,
    SignupComponent,
    LoginComponent,
    InfoComponent,
    AdminComponent,
    ManagerComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
