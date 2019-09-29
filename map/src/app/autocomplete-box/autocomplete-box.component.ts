/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild, EventEmitter, Output, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-autocomplete-box',
  templateUrl: './autocomplete-box.component.html',
  styleUrls: ['./autocomplete-box.component.css']
})
export class AutocompleteBoxComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public placeName: string;
  public searchControl: FormControl;
  public searchText: string;
  private IsValueSelectedFromAutoComplete: boolean = false;
  @Output() searchPlaceText: EventEmitter<any> = new EventEmitter();
  @Input() field: any;
  @Input() group: FormGroup;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.searchControl = new FormControl();

    //create search FormControl
    if (this.group) {
      this.group.addControl('searchControl', this.searchControl);
    }
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      this.autoCompletePlaceChanged(autocomplete);
    });
  }

  removeDefaultAutoComplete() {
    (<HTMLElement>this.searchElementRef.nativeElement).setAttribute('autocomplete', 'new-password');
  }

  public autoCompletePlaceChanged(autocomplete) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        this.searchText = place.formatted_address;
        //verify result
        /* if (place.geometry === undefined || place.geometry === null) {
          return;
        } */

        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.placeName = place.name;
        this.IsValueSelectedFromAutoComplete = true;

        //emit to comp to eanble dropdowns..
        let data = {
          "searchtext": this.searchText,
          "lat": this.latitude,
          "lng": this.longitude,
          "IsValueSelectedFromAutoComplete": this.IsValueSelectedFromAutoComplete,
          "placeName": place.name
        };
        if (this.group) {
          this.group.controls['searchControl'].setValue(data.searchtext);
          this.group.controls[this.field.id].setValue(data);
          this.group.controls[this.field.id].setErrors(null);
          this.group.controls[this.field.id].updateValueAndValidity();
        }
        this.searchPlaceText.emit(data);
      });
    });
  }

  public onsearchTextChange() {
   /* this.SendAddressDetails(); */
  }

  onSubmit() {
    this.SendAddressDetails();
    return false;
  }


  public SendAddressDetails() {

    //when no address found
    if (!this.IsValueSelectedFromAutoComplete) {
      this.searchText = this.searchControl.value;
      this.latitude = 0;
      this.longitude = 0;
    }

    let data = {
      "searchtext": this.searchText,
      "lat": this.latitude,
      "lng": this.longitude,
      "IsValueSelectedFromAutoComplete": this.IsValueSelectedFromAutoComplete,
      "HaveToCallApi": true,
      "placeName": this.placeName
    };
    this.searchPlaceText.emit(data);
  }
}
