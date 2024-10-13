import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Geolocation } from '@nativescript/geolocation'
import { request, getJSON, HttpResponse } from '@nativescript/core/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latitude: number
  longitude: number
  isLoading: boolean = false

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    this.getCurrentLocation()
  }

  getCurrentLocation() {
    this.isLoading = true
    Geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 })
      .then(loc => {
        if (loc) {
          this.latitude = loc.latitude
          this.longitude = loc.longitude
          this.isLoading = false
        }
      }).catch(error => {
        console.error('Error getting location', error)
        this.isLoading = false
      })
  }

  searchPlaces() {
    if (this.latitude && this.longitude) {
      this.routerExtensions.navigate(['/places'], {
        queryParams: {
          lat: this.latitude,
          lng: this.longitude
        }
      })
    }
  }
}