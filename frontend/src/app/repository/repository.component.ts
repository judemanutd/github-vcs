import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { GithubService } from './github.service';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Repository');

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit, OnDestroy {
  error: string | undefined;
  isLoading = false;
  username = '';
  repo = '';
  commits: any[];
  branches: any[];
  selectedBranchSHA: string;
  lastDateReceived: string;
  public isMenuCollapsed = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private GithubService: GithubService
  ) {
    this.route.params.subscribe(params => {
      this.username = params.username;
      this.repo = params.repo;
    });
  }

  ngOnInit() {
    this.selectedBranchSHA = '';
    this.lastDateReceived = '';
    this.fetchCommits();
  }

  ngOnDestroy() {}

  public onBranchSelected(sha: string) {
    this.lastDateReceived = '';
    this.selectedBranchSHA = sha;
    this.fetchCommits();
  }

  public fetchOlderCommits() {
    this.fetchCommits(false);
  }

  private fetchCommits(reload: boolean = true) {
    this.isLoading = true;
    this.GithubService.getGithubRepo({
      username: this.username,
      repo: this.repo,
      sha: this.selectedBranchSHA,
      date: this.lastDateReceived
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((commits: any) => {
        console.log('TCL: RepositoryComponent -> fetchCommits -> commits', commits);

        const length = commits.length;
        if (length > 0) {
          this.lastDateReceived = new Date(
            new Date(commits[length - 1].commit.committer.date).getTime() - 1
          ).toISOString();
        }
        if (reload) {
          this.commits = commits;
        } else {
          this.commits = [...this.commits, ...commits];
        }
      });

    this.GithubService.getGithubBranches({ username: this.username, repo: this.repo })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((branches: any) => {
        this.branches = branches;
      });
  }
}
