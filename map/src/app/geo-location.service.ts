import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppSettings } from './config/settings';
import {Observable, of} from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()

export class GeoLocationService {

  private LOCATION_DATA = AppSettings.API_ENDPOINT+'/add/';
  private GET_DATA = AppSettings.API_ENDPOINT+'/api/';
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  /* private headers = new Headers({ 'Content-Type' : 'application/json', 'Authorization':AppSettings.API_AUTH_HEADERS});
	private options   = new RequestOptions({ headers: this.headers });

	private hideLoader(): void {
    	this.loaderService.hide();
  	} */
constructor(private http: HttpClient) { }

sortLocation(dataObj: any): any {
  console.log("Service Data", dataObj);
  let _headers = new HttpHeaders();
  _headers.append('Content-Type', 'application/json');
  return this.http.post(this.LOCATION_DATA, dataObj, {headers : _headers}).pipe(map(response => {
    return response;
  }));
}

getAddData(){
  let _headers = new HttpHeaders();
  _headers.append('Content-Type', 'application/json');
  return this.http.get(this.GET_DATA, {headers : _headers}).pipe(map(response => {
    return response;
  }));
}



}
