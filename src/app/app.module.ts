import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { OlympicMedalsPieChartComponent } from './components/ui/charts/olympic-medals-pie-chart/olympic-medals-pie-chart.component';
import { CountryMedalsBarChartComponent } from './components/ui/charts/country-medals-bar-chart/country-medals-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CountryDetailsComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent, 
    OlympicMedalsPieChartComponent, 
    CountryMedalsBarChartComponent, 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
