import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteBoxComponent } from './autocomplete-box/autocomplete-box.component';
import { GeoLocationService } from '../app/geo-location.service';
@NgModule({
   declarations: [
      AppComponent,
      AutocompleteBoxComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyAa5y922oHoQlBhVUtx-LeeR3OXycHGrwE',
         libraries:['places']
       })
  ],
  providers: [
   GeoLocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
