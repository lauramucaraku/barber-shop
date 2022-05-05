import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nrOfPictures: any[];

  constructor() {
    this.nrOfPictures = [
      {
        'title': 'Modeli 1',
        'imgSrc': 'https://i.pinimg.com/originals/11/d9/47/11d947c0d9e199e39f37052772edc1bb.png',
        'description': 'Qethje, stilim flokesh dhe rruajtje. Realizimi i ketij modeli ' +
          'kerkon perafersisht 60 min dhe duhet te keni floke mbi 5cm te gjate.'
      },
      {
        'title': 'Modeli 2',
        'imgSrc': 'https://lovehairstyles.com/wp-content/uploads/2017/07/best-mens-hairstyles-rockabilly-pompadour.jpg',
        'description': 'Qethje dhe stilim flokesh. Realizimi i ketij modeli kerkon perafersisht 50 min dhe mund' +
          'te realizohet ne floke me te gjate se 6 cm.'
      },
      {
        'title': 'Modeli 3',
        'imgSrc': 'https://lovehairstyles.com/wp-content/uploads/2017/07/best-mens-hairstyles-slicked-back-modern-undercut-683x1024.jpg',
        'description': 'Qethje dhe stilim flokesh. Realizimi i ketij modeli kerkon perafersisht 60 min dhe nuk mund' +
          'te realizohet ne floke me te shkurter se 10 cm.'
      },
      {
        'title': 'Modeli 4',
        'imgSrc': 'https://lovehairstyles.com/wp-content/uploads/2017/07/best-mens-hairstyles-wavy-top-undercut.jpg',
        'description': 'Qethje, stilim flokesh dhe rruajtje. Realizimi i ketij modeli ' +
          'kerkon perafersisht 60 min dhe duhet te keni floke mbi 2 cm te gjate.'
      },
      {
        'title': 'Modeli 5',
        'imgSrc': 'https://lovehairstyles.com/wp-content/uploads/2017/07/best-mens-hairstyles-side-part-low-fade.jpg',
        'description': 'Qethje, stilim flokesh dhe rruajtje. Realizimi i ketij modeli ' +
          'kerkon perafersisht 60 min dhe duhet te keni floke mbi 3 cm te gjate.'
      },
    ];
  }

  ngOnInit(): void {
  }

}
