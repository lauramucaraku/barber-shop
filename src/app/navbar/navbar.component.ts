import { Component, OnInit } from '@angular/core';
import {navbarData} from "./nav-data";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  collapsed = false;
  navData = navbarData;
  ngOnInit(): void {
  }

}
