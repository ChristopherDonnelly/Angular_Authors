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

    addQuote(id, content){
      return this._http.put(`/authors/${id}/quote`, { content: content });
    }

    incrementVote(a_id, q_id, val){
      return this._http.put(`/authors/${a_id}/quote/${q_id}/vote`, { vote: val });
    }

    deleteQuote(a_id, q_id){
      return this._http.delete(`/authors/${a_id}/quote/${q_id}`);
    }

}
