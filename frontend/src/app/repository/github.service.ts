import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  // github: (c: any) => `/jokes/random?category=${c.category}`
  github: (github: any) => `https://api.github.com/repos/${github.username}/${github.repo}/commits`
};

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private httpClient: HttpClient) {}

  getGithubRepo(context: any): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.github(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }
}
