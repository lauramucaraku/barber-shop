import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {

  services: any[];
  appointmentTime: number;
  selectedServices: any[];
  clientName: string;
  clientTel: string;

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
    this.selectedServices = [];
    this.clientName = '';
    this.clientTel = '';
  }

  changeSelectedStatus(service: {}, index: number) {
    this.services[index].isSelected = ! this.services[index].isSelected;
    this.appointmentTime += this.services[index].time;
    this.selectedServices.push(service);
  }

  addAppointnment(): void {
    alert('Takimi i shtua me sukses. Kohezgjatja e takimit do te jete '+this.appointmentTime+' min.');
    this.clientName = (<HTMLInputElement>document.getElementById('emri')).value;
    this.clientName = (<HTMLInputElement>document.getElementById('numriTel')).value;
  }

  ngOnInit(): void {
  }

}
