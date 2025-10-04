import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/presentation/views/main-layout/main-layout.component';
import { DashboardComponent } from './shared/presentation/views/dashboard/dashboard.component';
import { MyCropsComponent } from './shared/presentation/views/my-crops/my-crops.component';
import { MyFieldsComponent } from './shared/presentation/views/my-fields/my-fields.component';
import { MyTasksComponent } from './shared/presentation/views/my-tasks/my-tasks.component';
import { CommunityComponent } from './shared/presentation/views/community/community.component';
import { LoginComponent } from './shared/presentation/views/login/login.component';
import { authGuard } from './shared/infrastructure/guards/auth.guard';
import { loginGuard } from './shared/infrastructure/guards/login.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-crops', component: MyCropsComponent },
      { path: 'my-fields', component: MyFieldsComponent },
      { path: 'my-tasks', component: MyTasksComponent },
      { path: 'community', component: CommunityComponent }
    ]
  }
];
