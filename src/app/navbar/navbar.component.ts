import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

interface NavBarToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
        style({opacity: 1})
        )
      ]),
          transition(':leave', [
          style({opacity: 1}),
          animate('350ms',
            style({opacity: 0})
          )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  @Output() onToggleNavBar: EventEmitter<NavBarToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleNavBar.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});

    }
  }

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

  this.screenWidth = window.innerWidth;
  }

}
