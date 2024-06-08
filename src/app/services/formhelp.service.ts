import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormhelpService {
  APIKey: string = '6492527f849e5034d485df6b5981d407';
  public page = 1;
  public idioma : string = "COP";
  formData: any = {};
  formDataDos: any = {};
  private header = new HttpHeaders({
    "Content-Type": "Application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials' : 'true', 
    'Access-Control-Allow-Methods' : 'GET'
  });

  constructor(
    private http: HttpClient
  ) { }

  setFormData(formData: any) {
    this.formData = formData;
  }

  getFormData() {
    return this.formData;
  }

  setFormDataDos(formDataDos: any) {
    this.formDataDos = formDataDos;
  }

  getFormDataDos() {
    return this.formDataDos;
  }

  getPaises(): Observable<any> {
    return this.http.get<any[]>("http://127.0.0.1:8000/Show", {
      headers: this.header
    })
  }

  getPC(): Observable<any> {
    return this.http.get<any[]>("http://127.0.0.1:8000/info", {
      headers: this.header
    })
  }

  getCiudades(): Observable<any> {
    return this.http.get<any[]>("http://127.0.0.1:8000/ShowCIty", {
      headers: this.header
    })
  }

  getHistorial(ip: string, nombrepc: string): Observable<any> {
    const url = `http://127.0.0.1:8000/ShowHistory/${ip}/${nombrepc}`;
    return this.http.get<any[]>(url, { headers: this.header });
  }

  getClima(ciudad :string) {
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/weather?q='+ciudad+'&appid=' +
        this.APIKey
    );
  }

  getcash(from :string, to : string, cash : number) {
    return this.http.get(
      'https://api.getgeoapi.com/v2/currency/convert?api_key=23c2f51a45b1fb4b550a62134abb8aabdb94d23f&from='+from+'&to='+to+'&amount='+cash+''
    );
  }

  postHistorial(historial: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/InsertHIstory", historial, {
      headers: this.header
    })
  }
}
