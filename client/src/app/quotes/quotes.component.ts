import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(
    public authorService: AuthorService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getQuotes();
  }

  voteUp(quote_id){
    console.log('Vote up Quote with: '+quote_id);

    let setVote = this._httpService.incrementVote(this.authorService.id, quote_id, 1);
    setVote.subscribe(data => {
        this.getQuotes();
      });
  }

  voteDown(quote_id){
    console.log('Vote down Quote with: '+quote_id);

    let setVote = this._httpService.incrementVote(this.authorService.id, quote_id, -1);
    setVote.subscribe(data => {
        this.getQuotes();
      });
  }

 delete(quote_id){
    console.log('Delete Quote ID: '+quote_id);

    let deleteQuote = this._httpService.deleteQuote(this.authorService.id, quote_id);
    deleteQuote.subscribe(data => {
      console.log('Delete Quote: '+data['quote'])
      this.getQuotes();
    });
  }

  getQuotes(){
    this._route.params.subscribe((params: Params) => {
      console.log('Find User Id: '+params['id']);
      this.authorService.id = params['id'];

      let getAuthor = this._httpService.getAuthor(this.authorService.id);
      getAuthor.subscribe(data => {
        console.log('Found Author Name: '+data['author'].name);
        this.authorService.location = `Quotes by ${data['author'].name}:`;
        this.authorService.name = data['author'].name;
        this.authorService.quotes = data['author'].quotes;
      });
    });
  }

}
