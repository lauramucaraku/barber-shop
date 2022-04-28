import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";

interface NavBarToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() onToggleNavBar: EventEmitter<NavBarToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;


  toogleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleNavBar.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});
  }

  closeNavbar(): void {
    this.collapsed = false;
    this.onToggleNavBar.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});

  }

  constructor() { }

  ngOnInit(): void {
  }

}
