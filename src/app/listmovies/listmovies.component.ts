import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {
  movieDB: any[] = [];
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.movieDB = data;
    });
  }

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.onGetMovies();
  }

}
