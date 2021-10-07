import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: 'app-addactortomovies',
  templateUrl: './addactortomovies.component.html',
  styleUrls: ['./addactortomovies.component.css']
})
export class AddactortomoviesComponent implements OnInit {

  constructor(private dbService: DatabaseService) {}
  actorsDB: any[] = [];
  movieDB: any[] = [];
  selectedActorIndex: number = 0;
  selectedMovieIndex: number = 0;
  onAddActorToMovie() {
    let id = this.movieDB[this.selectedMovieIndex]._id
    let obj = { id: this.actorsDB[this.selectedActorIndex]._id };
    this.dbService.addActorToMovie(id,obj).subscribe(result => {
    });
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.movieDB = data;
    });
  }

  setActorIndex(index: number) {
    this.selectedActorIndex = index;
 }
 setMovieIndex(index: number) {
  this.selectedMovieIndex = index;

}

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

}
