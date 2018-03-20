import { Component, OnInit } from '@angular/core';

import { AuthorService } from '../author.service';

@Component({
  selector: 'app-four0four',
  templateUrl: './four0four.component.html',
  styleUrls: ['./four0four.component.css']
})

export class Four0fourComponent implements OnInit {

  constructor(
    public authorService: AuthorService
  ) { }

  ngOnInit() {
    this.authorService.location = "Author not found:";
  }

}
