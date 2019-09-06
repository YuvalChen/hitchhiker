import { Routes } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren, NgZone, OnChanges, QueryList, NgModule } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'google-maps';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnChanges {
  latitude = 34.7818;
  longitude = 32.0853;
  zoom = 5;
  directionVisible = false;

  originLocation: any;
  destinationLocation: any;
  homeLocation: any;
  tranOriginLocation: any;
  tranOriginLocationKeep: any;

  public duration: number = 100000000;
  allCoordinates: any;

  @ViewChildren('search') searchElementRef: QueryList<ElementRef>;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnChanges() {
    console.log('here');
  }

  ngOnInit() {
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.toArray()[0].nativeElement, {});
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place === undefined || place === null || place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.originLocation = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });

      const autocomplete3 = new google.maps.places.Autocomplete(this.searchElementRef.toArray()[2].nativeElement, {});
      autocomplete3.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete3.getPlace();
          if (place === undefined || place === null || place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.homeLocation = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });

      const autocomplete2 = new google.maps.places.Autocomplete(this.searchElementRef.toArray()[1].nativeElement, {});
      autocomplete2.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete2.getPlace();
          if (place === undefined || place === null || place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.destinationLocation = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  async yuval(data) {
    // this.tranOriginLocation = this.destinationLocation;
    this.allCoordinates = data.routes[0].overview_path;

    // for (let x of this.allCoordinates) {

    // this.tranOriginLocation = x;
    //   // this.delay(1000);

    //   this.wait(500);
    // }
  }

  async wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  timoor(data) {
    console.log("timor");
  }

  aviv(data) {
    let currDuration = data.routes[0].legs[0].duration.value;
    console.log(currDuration);

    // if (currDuration < this.duration) {
    //   console.log(currDuration);
    //   this.duration = currDuration;
    //   this.tranOriginLocationKeep = this.tranOriginLocation;
    // }

    // this.tranOriginLocation = this.tranOriginLocationKeep;
  }
}