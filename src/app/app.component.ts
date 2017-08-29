import { Component, OnInit, NgZone } from '@angular/core';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

  declare var google: any;

  // just an interface for type safety.
  class Marker {
    constructor (public lat: number,
                 public lng: number,
                 public label?: string,
                 public draggable: boolean = false) {

    }
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _loader: MapsAPILoader,
    private _zone: NgZone) {
  }

  ngOnInit(): void {
    this.autocomplete();
  }

  autocomplete() {
    this._loader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocompleteInput'), {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this._zone.run(() => {
          const place = autocomplete.getPlace();

          this.markers.push(new Marker (
            place.geometry.location.lat(),
            place.geometry.location.lng(),
            place.name,
            true
          ));

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

          console.log(place.geometry.location.lat());
          console.log(place.geometry.location.lng());
          console.log(place.formatted_address);
          console.log(this.markers);
        });
      });
    });
  }

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 7.8731;
  lng: number = 80.7718;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: any) {
    this.markers.push(new Marker (
      $event.coords.lat,
      $event.coords.lng
    ));
  }

  markerDragEnd(m: Marker, $event: any) {
    console.log('dragEnd', m, $event);
  }

  markers: Marker[] = [];
}
