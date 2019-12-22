import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { RepositoryComponent } from './repository.component';

const routes: Routes = [
  { path: 'repository/:username/:repo', component: RepositoryComponent, data: { title: extract('Repository') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RepositoryRoutingModule {}
