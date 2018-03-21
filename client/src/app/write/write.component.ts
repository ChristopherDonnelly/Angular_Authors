import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpService } from '../http.service';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  quote: any;
  error: boolean;

  constructor(
    public authorService: AuthorService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) { }

  ngOnInit() {

    this.quote = {errors: ''}
    this.error = false;

    this.authorService.clear();

    this._route.params.subscribe((params: Params) => {
      console.log('Find User Id: '+params['id']);
      this.authorService.id = params['id'];

      let getAuthor = this._httpService.getAuthor(this.authorService.id);
      getAuthor.subscribe(data => {
        console.log('Found Author Name: '+data['author'].name);
        this.authorService.location = `Provide a quote by ${data['author'].name}:`;
        this.authorService.name = data['author'].name;
      });
    });
  }

  add(){

    let addQuote = this._httpService.addQuote(this.authorService.id, this.authorService.quote);
    addQuote.subscribe(data => {
      if(data['message'] == 'Error'){
        this.error = true;
        console.log(data['error'].errors.quotes)
        if(data['error']) this.quote.errors = data['error'].errors.quotes.errors.content.message;
        else console.log(data['error'])

      }else{
        console.log('Created New Quote: '+data['quote']);
        this.authorService.quote = data['quote'];

        this._router.navigate(['/quotes', this.authorService.id]);
      }
    });
  }

  cancel(){
    console.log('Cancel Edit!');
    
    this._router.navigate(['/quotes', this.authorService.id]);
  }

}
