import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { CreateAppComponent } from './components/create-app/create-app.component';
import { ListAppComponent } from './components/list-app/list-app.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditAppComponent,
  },
  {
    path: 'create',
    component: CreateAppComponent,
  },
  {
    path: 'list',
    component: ListAppComponent,
  },
  {
    path: '**',
    redirectTo: 'list'
  }

]


@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
})
export class AppAppRoutingModule { }
