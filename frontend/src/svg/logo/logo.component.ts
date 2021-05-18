import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {ElementRef} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit, AfterContentInit {
  @Input() height = 80;
  @Input() width = 360;

  constructor(private elementRef: ElementRef) { }

  updateCustomProperty(): void {
    this.elementRef.nativeElement.style.setProperty('--height', (this.height) + 'px');
    this.elementRef.nativeElement.style.setProperty('--width', (this.width - 20) + 'px');
  }

  ngAfterContentInit(): void {
    this.updateCustomProperty();
  }

  ngOnInit(): void {
  }

}
