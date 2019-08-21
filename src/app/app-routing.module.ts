import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffComponent } from './pages/staff.component';
import { DashboardComponent } from './pages/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'admin/staff', pathMatch: 'full', component: StaffComponent },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
