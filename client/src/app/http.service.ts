import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private _http: HttpClient){ }
    
    getAuthor(id){
      return this._http.get(`/authors/${id}`);
    }

    getAuthors(){
      return this._http.get('/authors');
    }

    createAuthor(name){
      return this._http.post('/authors', { "name": name });
    }

    updateAuthor(id, name){
      return this._http.put(`/authors/${id}`, { "name": name });
    }

    deleteAuthor(id){
      return this._http.delete(`/authors/${id}`);
    }
}
