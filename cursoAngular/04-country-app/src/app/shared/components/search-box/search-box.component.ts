import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtValue')
  public value!: ElementRef<HTMLInputElement>;

  emitValue(): void {
    const newValue = this.value.nativeElement.value;
    console.log('Nuevo valor: ' + newValue);

    this.onValue.emit(newValue);
    // this.value.nativeElement.value = '';
  }
}
