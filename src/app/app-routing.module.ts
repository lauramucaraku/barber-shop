import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {NavbarComponent} from "./navbar/navbar.component";
import {ServicesPageComponent} from "./services-page/services-page.component";

const routes: Routes = [
  {path:'', redirectTo: 'services', pathMatch: 'full'},
  {path:"services", component:ServicesPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
