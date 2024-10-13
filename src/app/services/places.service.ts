import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiKey = '8217d6b7246840fe8aae9b43b411d71e';
  private apiUrl = 'https://api.geoapify.com/v2/places';

  constructor(private http: HttpClient) {}

  searchNearbyPlaces(lat: number, lon: number, categories: string = 'commercial.shopping'): Observable<any[]> {
    const url = `${this.apiUrl}?categories=${categories}&filter=circle:${lon},${lat},5000&limit=20&apiKey=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => response.features.map(feature => ({
        id: feature.properties.place_id,
        name: feature.properties.name,
        address: feature.properties.formatted,
        categories: feature.properties.categories,
        distance: feature.properties.distance
      })))
    );
  }

  getPlaceDetails(placeId: string): Observable<any> {
    const url = `${this.apiUrl}?id=${placeId}&apiKey=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const feature = response.features[0];
        return {
          id: feature.properties.place_id,
          name: feature.properties.name,
          address: feature.properties.formatted,
          categories: feature.properties.categories,
          phone: feature.properties.datasource.raw.phone,
          website: feature.properties.datasource.raw.website
        };
      })
    );
  }
}