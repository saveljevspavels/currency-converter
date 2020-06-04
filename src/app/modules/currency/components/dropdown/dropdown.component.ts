import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '../../../../components/base-input/base-input.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownComponent),
    },
  ],
})
export class DropdownComponent extends BaseInputComponent
  implements OnChanges, AfterViewInit {
  @Input()
  options: any;

  selectedValue: any;

  constructor() {
    super();
  }

  onChange(e: Event, value: any) {
    this.innerValue = this.selectedValue;
    this.propagateChange(this.innerValue);
  }

  ngOnChanges(): void {
    this.selectedValue = this.c.value;
    this.innerValue = this.selectedValue;
  }

  ngAfterViewInit() {
    this.c.valueChanges.subscribe(() => {
      if (
        this.c.value === '' ||
        this.c.value === null ||
        this.c.value === undefined
      ) {
        this.innerValue = '';
      } else {
        this.selectedValue = this.c.value;
        this.innerValue = this.selectedValue;
      }
    });
  }
}
