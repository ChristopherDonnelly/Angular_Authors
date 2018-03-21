import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    public authorService: AuthorService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.authorService.location = "We have quotes by:";
    this.getAllAuthors();
  }

  edit(auth_id){
    console.log('Navigate to Edit with Auth ID: '+auth_id);

    this._router.navigate(['/edit',auth_id]);
  }

  view(auth_id){
    console.log('Navigate to View Quotes with Auth ID: '+auth_id);

    this._router.navigate(['/quotes',auth_id]);
  }

  /* delete(auth_id){
    console.log('Delete Auth ID: '+auth_id);

    let deleteAuthor = this._httpService.deleteAuthor(auth_id);
    deleteAuthor.subscribe(data => {
      console.log('Delete Author Name: '+data['author'])
      this.getAllAuthors();
    });
  } */

  getAllAuthors(){
    let getAllAuthors = this._httpService.getAuthors();
    getAllAuthors.subscribe(data => {
      this.authorService.all = data['authors'];
    });
  }

}
