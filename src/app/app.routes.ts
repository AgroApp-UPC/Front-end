import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/presentation/views/main-layout/main-layout.component';
import { DashboardComponent } from './shared/presentation/views/dashboard/dashboard.component';
import { MyCropsComponent } from './shared/presentation/views/my-crops/my-crops.component';
import { MyFieldsComponent } from './shared/presentation/views/my-fields/my-fields.component';
import { MyTasksComponent } from './shared/presentation/views/my-tasks/my-tasks.component';
import { CommunityComponent } from './shared/presentation/views/community/community.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
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
