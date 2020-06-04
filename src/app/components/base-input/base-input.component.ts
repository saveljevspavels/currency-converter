import { AfterViewInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

export abstract class BaseInputComponent
  implements ControlValueAccessor, AfterViewInit {
  @Input()
  public label: string;

  @Input()
  public fieldName: string;

  @Input()
  public disabled = false;

  @Input() c: FormControl = new FormControl();

  protected innerValue: any = '';

  public propagateChange = (_: any) => {};

  public propagateTouched = () => {};

  ngAfterViewInit() {
    this.c.valueChanges.subscribe(() => {
      if (
        this.c.value === '' ||
        this.c.value === null ||
        this.c.value === undefined
      ) {
        this.innerValue = '';
      }
    });
  }

  public onChange(e: Event, value: any) {
    this.innerValue = typeof value === 'string' ? value.trim() : value;
    this.propagateChange(this.innerValue);
  }

  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.innerValue = value;
  }

  // From ControlValueAccessor interface
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // From ControlValueAccessor interface
  public registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
}
