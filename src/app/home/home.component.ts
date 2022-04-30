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
        'imgSrc': 'https://time-tips.com/wp-content/uploads/2022/04/10-Best-Hairstyles-Haircuts-For-Men.jpg'
      },
      {
        'title': 'Modeli 2',
        'imgSrc': 'https://www.menshairstylestoday.com/wp-content/uploads/2019/02/Slicked-Back-Undercut.jpg'
      },
      {
        'title': 'Modeli 3',
        'imgSrc': 'https://www.fashionhombre.com/wp-content/uploads/2020/01/Cool-Hairstyles-For-Black-Men-With-Long-Hair-2.jpg'
      },
      {
        'title': 'Modeli 4',
        'imgSrc': 'https://cdn-acpnk.nitrocdn.com/dMpdmqaVNyoDKnlvjKpSdCgrqQLGwfuY/assets/static/optimized/rev-b121d2c/wp-content/uploads/2021/07/High-Tight-Mens-Hair-Style.jpg'
      },
      {
        'title': 'Modeli 5',
        'imgSrc': 'https://i.pinimg.com/474x/73/73/67/73736737ad005ceba24ed59f4ce7d60f.jpg'
      },
      {
        'title': 'Modeli 6',
        'imgSrc': 'https://hairmanstyles.com/wp-content/uploads/2019/09/14.jpg'
      },
    ];
  }

  ngOnInit(): void {
  }

}
