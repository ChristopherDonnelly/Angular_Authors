import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpService } from '../http.service';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
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

    this.authorService.location = "Edit this author:";
    this._route.params.subscribe((params: Params) => {
      console.log('Edit User Id: '+params['id']);
      this.authorService.id = params['id'];

      let getAuthor = this._httpService.getAuthor(this.authorService.id);
      getAuthor.subscribe(data => {
        console.log('Found Author Name: '+data['author'].name);
        this.authorService.name = data['author'].name;
      });
    });
  }

  update(id){
    let updateAuthor = this._httpService.updateAuthor(this.authorService.id, this.authorService.name);
    updateAuthor.subscribe(data => {
      if(data['message'] == 'Error'){
        // console.log(data['error'].errors.name.message)
        this.error = true;
        this.name.errors = data['error'].errors.name.message;
        // console.log(data['error'].name, data['error'].message);
      }else{
	      console.log('Updated Author Name: '+data['author'].name);
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
