import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  // github: (c: any) => `/jokes/random?category=${c.category}`
  repo: (github: any) => `https://api.github.com/repos/${github.username}/${github.repo}/commits`,
  branches: (github: any) => `https://api.github.com/repos/${github.username}/${github.repo}/branches`,
  collaborators: (github: any) => `https://api.github.com/repos/${github.username}/${github.repo}/collaborators`
};

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private httpClient: HttpClient) {}

  getGithubRepo(context: any): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.repo(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  getGithubBranches(context: any): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.branches(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  // getGithubCollaborators(context: any): Observable<string> {
  //   return this.httpClient
  //     .cache()
  //     .get(routes.collaborators(context))
  //     .pipe(
  //       map((body: any) => body),
  //       catchError(() => of('Error, could not load joke :-('))
  //     );
  // }
}
