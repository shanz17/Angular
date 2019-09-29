import { Component, OnInit } from '@angular/core';
import { GeoLocationService } from './geo-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public enablePreferredLocations: boolean = false;
  public preferredLocationList = [];
  /* Array<string> = new Array<string>(); */
  public homeLocation: any;
  listObj: Object;
  sortedLocation: any = [];

  constructor(private geoLocationService: GeoLocationService) {

  }

  ngOnInit() {

  }

  selectedHomePlace(data) {
    this.enablePreferredLocations = true;
    if (data.IsValueSelectedFromAutoComplete) {
      this.homeLocation = data;
    }


    console.log('Home Location', this.homeLocation);
  }

  selectedPlace(data, index) {
    this.enablePreferredLocations = true;
    this.preferredLocationList[index] = "";
    this.preferredLocationList[index] = data;
    console.log(this.preferredLocationList)
    /* if (data.IsValueSelectedFromAutoComplete === true) {
      if (this.preferredLocationList.length < 7) {
          this.preferredLocationList.push(data);
          console.log(this.preferredLocationList);
      }
    } */
  }

  addNewLocation() {
    if (this.preferredLocationList.length < 7) {
      if (this.preferredLocationList.length == 0) {
        this.preferredLocationList[0] = "dummy0";
      } else {
        this.preferredLocationList[this.preferredLocationList.length] = 'dummy' + this.preferredLocationList.length;
      }
      /* console.log(this.preferredLocationList);*/


      /*if(this.preferredLocationList.length < 7) {
         if(this.preferredLocationList.length == 0) {
           this.preferredLocationList[0] = "dummy0";
         } else {
           this.preferredLocationList[this.preferredLocationList.length] = "dummy"+this.preferredLocationList.length;
         }
         console.log(this.preferredLocationList.length);
        console.log(this.preferredLocationList);
      }*/
    }
  }

  sortLocation() {
    console.log('Home Location on Submit', this.homeLocation);
    console.log('prefered Location on Submit', this.preferredLocationList);
    let locationData : any = {};
    locationData.homeLocationData = this.homeLocation;
    locationData.preferedLocationData = this.preferredLocationList;

    console.log("Data", locationData);
    /* this.geoLocationService.sortLocation(locationData).subscribe(response => {

    }); */
    /* this.geoLocationService.sortLocation(locationData).subscribe((result) => {
      console.log("Data Result");
    }); */
    this.geoLocationService.sortLocation(locationData).subscribe(data =>{
      this.sortedLocation = data;
      console.log("Sorted Location", this.sortLocation);
    });

    /* this.geoLocationService.getAddData().subscribe(response =>{

    }); */

  }
}

