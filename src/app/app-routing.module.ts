import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {NavbarComponent} from "./navbar/navbar.component";
// import {ServicesPageComponent} from "./services-page/services-page.component";

const routes: Routes = [
  // {path:"home", component: NavbarComponent},
  // {path:"services", component:ServicesPageComponent}
  // {path:"location", component:NavbarComponent},
  // {path:"aboutus", component:NavbarComponent},
  // {path:"login", component:NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
