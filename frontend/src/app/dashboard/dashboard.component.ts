import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Dashboard');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  error: string | undefined;
  dashboardForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  submitURL() {
    this.isLoading = true;
    const values = this.dashboardForm.value;
    const url = values.url;
    const url_sections = url.split('/');
    const repo = 'repository/' + url_sections[3] + '/' + url_sections[4];
    this.isLoading = false;
    this.router.navigate([this.route.snapshot.queryParams.redirect || repo], { replaceUrl: true });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.dashboardForm = this.formBuilder.group({
      url: ['https://github.com/GlennFernandes/dynasty', Validators.required]
    });
  }
}
