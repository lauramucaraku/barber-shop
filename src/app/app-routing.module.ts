import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServicesPageComponent} from "./services-page/services-page.component";
import {HomeComponent} from "./home/home.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {SettingsComponent} from "./settings/settings.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'}, //home
  {path:"home", component:HomeComponent},
  {path:"schedule", component:ScheduleComponent},
  {path:"services", component:ServicesPageComponent},
  {path:"settings", component:SettingsComponent},
  {path:"login", component:LoginComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
