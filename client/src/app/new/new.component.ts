import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpService } from '../http.service';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {
  name: any;
  error: boolean;

  constructor(
    public authorService: AuthorService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) { }

  ngOnInit() {

    this.name = {errors: ''}
    this.error = false;

    this.authorService.location = "Add a new author:";
    this.authorService.name = '';
  }

  add(){

    let addAuthor = this._httpService.createAuthor(this.authorService.name);
    addAuthor.subscribe(data => {
      if(data['message'] == 'Error'){
        // console.log(data['error'].errors.name.message)
        this.error = true;
        this.name.errors = data['error'].errors.name.message;
        // console.log(data['error'].name, data['error'].message);
      }else{
        console.log('Created Author Name: '+data['author'].name);
        this.authorService.name = data['author'].name;

        this._router.navigate(['/home']);
      }
    });
  }

  cancel(){
    console.log('Cancel Edit!');

    this._router.navigate(['/home']);
  }

}
