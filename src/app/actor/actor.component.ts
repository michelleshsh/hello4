import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  movieDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  movieTitle: string = "";
  movieYear: number = 0;
  year2: number = 0;
  year1: number = 0;
  title: string = "";
  selectedActorIndex: number = 0;
  selectedMovieIndex: number = 0;

  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  //Get all Movies 
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.movieDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
   //Create a new Movie, POST request
   onCreateMovie() {
    let obj = { title: this.movieTitle, year: this.movieYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  // Update an Actor
  onSelectUpdate(item: { name: string; bYear: number; _id: string; }) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item: { _id: any; }) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Movies Between Years
  onDeleteMovieYears() {
    let obj = { year2: this.year2, year1: this.year1 };
    this.dbService.deleteMoviesbtYears(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movies By Title
  onDeleteMovie() {
    let obj = { title: this.title};
    this.dbService.deleteMoviesByTitle(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.movieTitle = "";
    this.movieYear = 0;
    this.year1 = 0;
    this.year2 = 0;
    this.title = "";
  }
  setActorIndex(index: number) {
    this.selectedActorIndex = index;
 }
 setMovieIndex(index: number) {
  this.selectedMovieIndex = index;

}
onAddActorToMovie() {
  let id = this.movieDB[this.selectedMovieIndex]._id
  let obj = { id: this.actorsDB[this.selectedActorIndex]._id };
  this.dbService.addActorToMovie(id,obj).subscribe(result => {
  });
}

}