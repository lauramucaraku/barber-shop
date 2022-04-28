import { Component } from '@angular/core';

interface NavBarToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'barber-shop-project';

  isNavBarCollapsed = false;
  screenWidth = 0;

  onToggleNavBar( data: NavBarToggle): void {
    this.screenWidth = data.screenWidth;
    this.isNavBarCollapsed = data.collapsed;
  }
}
