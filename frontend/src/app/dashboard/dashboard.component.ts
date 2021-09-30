import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  error: string | undefined;
  dashboardForm!: FormGroup;
  isLoading = false;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
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

  private createForm() {
    this.dashboardForm = this.formBuilder.group({
      // url: ['https://github.com/GlennFernandes/dynasty', Validators.required]
      url: ['https://github.com/judemanutd/github-vcs', Validators.required],
    });
  }
}
