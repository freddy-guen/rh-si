import { Routes } from '@angular/router';
import { EmployeListComponent } from './component/employe-list/employe-list.component';

export const routes: Routes = [
  {
    path : '',
    component : EmployeListComponent
  },
  {
    path : 'employe',
    component : EmployeListComponent
  }
];
