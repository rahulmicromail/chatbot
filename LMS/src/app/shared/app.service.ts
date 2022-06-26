import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { url } from './app.constant';

@Injectable()
export class ApiService {
  api = url.apiurl; tokenheaders:any={}; token;
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
    imgheaders : new HttpHeaders({
      'cache' : 'false',
			'processData': 'false',
			'contentType': 'false'
    })
  }
  
  constructor(private http: HttpClient) {}

  setUserToken(data:any) {
    sessionStorage.setItem('user_token', data.token);
  }
  setAccessToken(data:any) {
    sessionStorage.setItem('access_token', data);
  }

  getUserToken(data:any) {
    sessionStorage.getItem('user_token');
  }
  getAccessToken(data:any) {
    sessionStorage.getItem('access_token');
  }

  getMethod(url:any) {
    return this.http.get(this.api + url);
  }

  getAuthMethod(url:any) {
    this.token = sessionStorage.getItem('user_token');
    this.tokenheaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'authorization' : 'Bearer '+ this.token
    });
    return this.http.get(this.api + url,{ headers: this.tokenheaders });
  }

  getListMethod(url:any) {
    return this.http.get('../../assets/'+url);
  }
  
  getImgMethod(url:any) {
    return this.http.get(this.api + url, { responseType: 'blob' });
  }

  getMultipleImgMethod(url:any,obj:any) {
    return this.http.post(this.api + url,JSON.stringify(obj), { headers: this.httpOptions.headers });
  }

  postMethod(url:any,obj:any) {
    return this.http.post(this.api + url, JSON.stringify(obj),{ headers: this.httpOptions.headers });
  }

  postAuthMethod(url:any,obj:any) {
    this.token = sessionStorage.getItem('user_token');
    this.tokenheaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'authorization' : 'Bearer ' + this.token
    });
    return this.http.post(this.api + url, JSON.stringify(obj),{ headers: this.tokenheaders });
  }

  postImgMethod(url:any,data:any) {
    return this.http.post(this.api + url, data);
  }
}
