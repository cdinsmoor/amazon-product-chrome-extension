import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ProductFormComponent } from '../components/product-form/product-form.component';



const routes: Route[] = [
  {
    path: '',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: false,
      enableTracing: false
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
