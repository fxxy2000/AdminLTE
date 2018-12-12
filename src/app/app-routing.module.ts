import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooklistComponent } from './book/booklist/booklist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './error404/error404.component';
import { BookformComponent } from './book/bookform/bookform.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path : 'dashboard', component : DashboardComponent},
  {path : 'booklist', component : BooklistComponent},
  {path : 'bookdetail/:id', component : BookformComponent},
  {path : '**', component : Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
