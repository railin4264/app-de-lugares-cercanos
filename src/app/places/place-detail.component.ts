import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { PlacesService } from '../services/places.service'

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  place: any
  isLoading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id
    this.getPlaceDetails(id)
  }

  getPlaceDetails(id: string) {
    this.isLoading = true
    this.placesService.getPlaceDetails(id).subscribe(
      (place) => {
        this.place = place
        this.isLoading = false
      },
      (error) => {
        console.error('Error fetching place details', error)
        this.isLoading = false
      }
    )
  }
}