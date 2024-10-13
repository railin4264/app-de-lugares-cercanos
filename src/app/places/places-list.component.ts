import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { PlacesService } from '../services/places.service'

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  places: any[] = []
  isLoading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['lat'] && params['lng']) {
        this.searchNearbyPlaces(params['lat'], params['lng'])
      }
    })
  }

  searchNearbyPlaces(lat: number, lng: number) {
    this.isLoading = true
    this.placesService.searchNearbyPlaces(lat, lng).subscribe(
      (places) => {
        this.places = places
        this.isLoading = false
      },
      (error) => {
        console.error('Error fetching places', error)
        this.isLoading = false
      }
    )
  }

  onItemTap(args) {
    const tappedItem = args.index
    this.routerExtensions.navigate(['/place', this.places[tappedItem].id])
  }
}