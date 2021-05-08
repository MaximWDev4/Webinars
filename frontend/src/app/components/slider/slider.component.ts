import {Component, Input, OnInit} from '@angular/core';
import { Global } from '../../_models/global';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() slides: {background: string, title: string, subtitle: string}[] = [];
  @Input() showNavigation: boolean;
  kowychki = '"';

  config = {
    autoplay: 3000, // Autoplay option having value in milliseconds
    initialSlide: 3, // Slide Index Starting from 0
    slidesPerView: 3, // Slides Visible in Single View Default is 1
    pagination: '.swiper-pagination', // Pagination Class defined
    paginationClickable: true, // Making pagination dots clicable
    nextButton: '.swiper-button-next', // Class for next button
    prevButton: '.swiper-button-prev', // Class for prev button
    spaceBetween: 30 // Space between each Item

  };

  constructor(public global: Global) { }

  ngOnInit(): void {
  }

}
