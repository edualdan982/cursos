import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalsLayotComponent } from './layout/signals-layot/signals-layot.component';
import { CounterPageComponent } from './pages/counter-page/counter-page.component';
import { UserInfoPageComponent } from './pages/user-info-page/user-info-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignalsLayotComponent,
    children: [
      {path: 'counter', component: CounterPageComponent},
      {path: 'user-info', component: UserInfoPageComponent},
      {path: 'properties', component: PropertiesPageComponent},
      {path: '**', component: CounterPageComponent},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalsRountingModule {}
