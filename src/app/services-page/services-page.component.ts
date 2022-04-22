import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {

  services: any[];
  appointmentTime: number;

  constructor() {
    this.services = [
      {
        name: 'Qethje',
        time: 45,
        isSelected: false
      },
      {
        name: 'Rruajtje',
        time: 5,
        isSelected: false
      },
      {
        name: 'Rruajtje me stilim',
        time: 10,
        isSelected: false
      },
      {
        name: 'Larje',
        time: 3,
        isSelected: false
      },
      {
        name: 'Stilim flokesh',
        time: 7,
        isSelected: false
      }
    ];
    this.appointmentTime = 0;
  }

  changeSelectedStatus(service: {}, index: number) {
    // console.log(service);
    this.services[index].isSelected = ! this.services[index].isSelected;
    // console.log(service);
    this.appointmentTime += this.services[index].time;
  }

  calculateTime() {
    console.log(this.appointmentTime);
  }

  ngOnInit(): void {
  }

}

