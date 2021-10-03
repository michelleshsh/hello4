import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  selectedIndex: number = 0;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data: { name: string; bYear: number; }) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id: string, data: { name: string; bYear: number; }) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  createMovie(data: { title: string; year: number}) {
    return this.http.post("/movies", data, httpOptions);
  }
  getMovies() {
    return this.http.get("/movies");
  }
  deleteMoviesByTitle(data: {title: string}) {
    return this.http.request("DELETE","/movies",{
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      body: data
   });
  }
  deleteMoviesbtYears(data: {year2: number, year1: number}) {
    return this.http.request("DELETE","/moviesByYear",{
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      body: data
   });
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
  addActorToMovie(actor: string, data: { id: string; }) {
    let url = "/movies/" + actor + "/actors";
    return this.http.post(url, data, httpOptions);
  }
}