import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ListaDenunciasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListaDenunciasProvider {

  constructor(public http: HttpClient) {}


 lista(email){
  return  this.http.get('http://apitesteionic.godocs.com.br/api/ocorrencias/'+email).toPromise()
  }

 adiciona(data: FormData){
   let headers = new HttpHeaders();

   return  this.http.post('http://apitesteionic.godocs.com.br/api/ocorrencias',data,{headers: headers}).toPromise()

 }
}


