import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.guard';
import { EditComponent } from './cmps/edit/edit.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
const routes: Routes = [
  {
    path: 'statistic',
    component: StatisticPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupPageComponent },

  {
    path: 'contact',
    component: ContactPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'edit/:id', component: EditComponent },
      { path: 'edit', component: EditComponent },
    ],
  },
  { path: 'contact/:id', component: ContactDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
