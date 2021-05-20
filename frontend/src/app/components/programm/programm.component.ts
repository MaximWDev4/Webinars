import {Component, Input, OnInit} from '@angular/core';
import {Event, Point, Line, TimelineProperties, TimelineSegment} from 'ngx-timeline-vertical';

@Component({
  selector: 'app-programm',
  templateUrl: './programm.component.html',
  styleUrls: ['./programm.component.scss']
})
export class ProgrammComponent implements OnInit {

  @Input() steps: { title: string, text: string }[] = [];
  timelineThickness: string;
  startpoint: Point;
  endpoint: Point;
  timelineSegments: TimelineSegment[] = [];
  point: any;
  constructor() { }

  ngOnInit(): void {
    this.ngxPointInit();
    this.ngxTimelineThicknessInit();
    this.ngxTimelineSegmentsInit();
  }

  ngxPointInit(): void {
    // The Point constructor takes _size: string, _color: string, _borderRadius: string
    this.startpoint = new Point('2rem', '#d4ddd6', '50%');
    this.endpoint = new Point('2rem', '#d4ddd6', '50%');
  }

  ngxTimelineThicknessInit(): void {
    this.timelineThickness = '5px';
  }

  ngxTimelineSegmentsInit(): void {
    // The constructor is left empty, creating a default TimelineSegment
    const timelineSegments: TimelineSegment[] = [];
    this.steps.forEach( (step, index) => {
      timelineSegments.push(
        new TimelineSegment(
          new TimelineProperties('#d4ddd6', '150px'),
          new Point('15vw', '#d4ddd600', '50%'),
          new Event('#000000', '1rem', index % 2 === 0 ? 'left' : 'right', step.text),
          new Line('dashed', '#d4ddd6', '5px')
        ),
      ); });
    // const timelineSegments: TimelineSegment[] = [
    //   new TimelineSegment(
    //     new TimelineProperties('#d4ddd6', '150px'),
    //     new Point('15vw', '#d4ddd600', '50%'),
    //     new Event('#000000', '1rem', 'left', 'Сарос отражает радиант. Полнолуние меняет математический горизонт. Полнолуние дает космический Каллисто. Декретное время пространственно оценивает непреложный космический мусор – это скорее индикатор, чем примета.!'),
    //     new Line('dashed', '#d4ddd6', '5px')),
    //   new TimelineSegment(
    //     new TimelineProperties('#d4ddd6', '150px'),
    //     new Point('15vw', '#d4ddd600', '50%'),
    //     new Event('#000000', '1rem', 'right', 'Математический горизонт, оценивая блеск освещенного металического шарика, перечеркивает космический космический мусор. Маятник Фуко, на первый взгляд, вращает Юпитер. Различное расположение, по определению, непрерывно. Магнитное поле, оценивая блеск освещенного металического шарика, притягивает pадиотелескоп Максвелла.'),
    //     new Line('dashed', '#d4ddd6', '5px')),
    //   new TimelineSegment(
    //     new TimelineProperties('#d4ddd6', '150px'),
    //     new Point('15vw', '#d4ddd600', '50%'),
    //     new Event('#000000', '1rem', 'left', 'Восход точно дает межпланетный параметр. Планета, после осторожного анализа, гасит межпланетный афелий . Угловое расстояние, по определению, непрерывно. Тукан, по определению, недоступно отражает межпланетный годовой параллакс.'),
    //     new Line('dashed', '#d4ddd6', '5px'))];
    timelineSegments.forEach((timelineSegment) => {
      this.timelineSegments.push(timelineSegment);
    });
    console.log(this.timelineSegments);
  }
  addEvent(): void {
    const timelineSegment: TimelineSegment = new TimelineSegment();

    // Set the text to 'This event was added'.
    timelineSegment.getEvent().setText('This event was added');

    // Set the Event side to be on the 'left' of the timeline.
    timelineSegment.getEvent().setSide('left');

    // Create a new point with a size of '20px', color of 'red', and borderRadius of '30px'.
    const point: Point = new Point('20px', 'red', '30px');

    // Set timelineSegment's point to point.
    timelineSegment.setPoint(point);

    // Create a default line
    const line: Line = new Line();

    // Change the line style to 'dashed'
    line.setStyle('dashed');

    // Add line to timelineSegment
    timelineSegment.setLine(line);

    // Push timelineSegment to timelineSegments
    this.timelineSegments.push(timelineSegment);
  }
}
