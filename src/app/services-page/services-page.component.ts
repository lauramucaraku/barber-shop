import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {

  services: string[];
  servicesTime: number[];

  constructor() {
    this.services = [
      'Qethje',
      'Rruajtje',
      'Rruajtje me stilim',
      'Larje',
      'Stilim flokesh'
    ];
    this.servicesTime = [45, 5, 10, 3, 3];
  }

  ngOnInit(): void {
  }

}
