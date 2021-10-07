import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  title: string = "";
  onDeleteMovie() {
    let obj = { title: this.title};
    this.dbService.deleteMoviesByTitle(obj).subscribe(result => {
      this.router.navigate(["/listmovie"]);
    });
  }

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
  }

}
