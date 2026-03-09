import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;
  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue: string = '';
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  @ViewChild('txtValue')
  public value!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy(): void {
    console.log('Componente destruido');
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(): void {
    const newValue = this.value.nativeElement.value;
    console.log('Nuevo valor: ' + newValue);

    this.onValue.emit(newValue);
    // this.value.nativeElement.value = '';
  }
  onKeyPress(searhTerm: string) {
    this.debouncer.next(searhTerm);
  }
}
