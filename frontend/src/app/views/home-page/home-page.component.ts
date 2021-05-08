import {Component, Inject, OnInit} from '@angular/core';
import {WEBINAR_INFO} from './home-page.providers';
import {Observable} from 'rxjs';
import {Webinar} from '../../_models/webinar';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss' ],
})
export class HomePageComponent implements OnInit {

  constructor(
    @Inject(WEBINAR_INFO) readonly webinar$: Observable<Webinar>,
  ) {}
  program: [{title: 'Step1!', text: 'textr'}, {title: 'Step2!', text: 'Step2 text'}];
  spikier: '../../../assets/spiker_1.jpg';
  navBarElements = [{
      name: 'Home',
      href: '#'
    },
    {
      name: 'bla-bla',
      href: '#2'
    },
    {
      name: 'Help',
      href: '#3'
    }
  ];

  slides = [
    { background: 'slider-back-1.jpg',
      title: 'LOREM',
      subtitle: ''
    },
    { background: 'slider-back-2.jpg',
      title: 'Lorem',
      subtitle: 'orem ipsum dolor sit amet, consectetur adipisicing'
    },
    { background: 'slider-back-3.jpg',
      title: 'Lorem',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi harum laudantium nam, nobis qui rerum.'
    }
  ];

  ngOnInit(): void {
  }
}

