import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermDetailComponent } from './term-detail/term-detail.component';
import { TermListComponent } from './term-list/term-list.component';

const routes: Routes = [
  { path: 'term/:id', component: TermDetailComponent },
  { path: '', component: TermListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
