import { Injectable } from '@angular/core';

@Injectable()
export class AuthorService {

  location = '';
  id = '';
  name = '';
  quote = '';
  all = [];
  quotes = [];
  
  constructor() { }

  clear(){
    this.location = '';
    this.id = '';
    this.name = '';
    this.quote = '';
    this.all.length = 0;
    this.quotes.length = 0;
  }
}
