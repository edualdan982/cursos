import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'contador-alone',
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './contador-alone.component.html',
  styleUrls: ['./contador-alone.component.css']
})
export class ContadorAloneComponent {
  @Input()
  public counter: number = 10;
}
