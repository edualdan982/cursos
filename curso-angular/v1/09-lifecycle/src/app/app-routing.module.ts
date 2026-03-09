import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './products/pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path:'product', component: ProductComponent},
      {path:'**', redirectTo: 'product'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
