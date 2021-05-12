import {Component, Inject, OnInit} from '@angular/core';
import {WEBINAR_INFO} from './home-page.providers';
import {Observable} from 'rxjs';
import {Webinar} from '../../_models/webinar';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss' ],
})
export class HomePageComponent implements OnInit {
  public webinar: any;

  constructor(
    // @Inject(WEBINAR_INFO) readonly webinar$: Observable<Webinar>,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        console.log(params);
        const id = params.get('id');
        this.webinar = {
          id,
          name: 'Name',
          url: 'url',
        };
      }
    );
  }
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

