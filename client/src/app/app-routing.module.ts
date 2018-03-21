import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WriteComponent } from './write/write.component';
import { Four0fourComponent } from './four0four/four0four.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'new', component: NewComponent },
  { path: 'quotes/:id', component: QuotesComponent },
  { path: 'write/:id', component: WriteComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: Four0fourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
