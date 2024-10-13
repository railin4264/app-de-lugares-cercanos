import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from '@nativescript/angular'
import { NativeScriptHttpClientModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { PlacesListComponent } from './places/places-list.component'
import { PlaceDetailComponent } from './places/place-detail.component'
import { PlacesService } from './services/places.service'

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PlacesListComponent,
    PlaceDetailComponent,
  ],
  providers: [PlacesService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}