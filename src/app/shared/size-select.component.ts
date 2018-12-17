import { Component, Input, forwardRef } from '@angular/core';
import { ShirtSize } from './shirt-size';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-size-select',
    template: `<select class="form-control form-control-sm size-select" [ngModel]="selectedSize">
                <option *ngFor="let s of sizes" value="{{s}}">{{s}}</option>
               </select>`,
    styles: [`.size-select {
                font-size: 12px;
                font-weight: bold;
                width: 174px;
                color: #10A2DC;
            }`],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SizeSelectComponent),
            multi: true
        }
    ]
})
export class SizeSelectComponent implements ControlValueAccessor {
    
    @Input() selectedSize: ShirtSize;
    sizes = Object.values(ShirtSize);

    onChange: any = () => {};
    onTouched: any = () => {};

    constructor() {}

    get value() {
        return this.selectedSize;
    }

    set value(val) {
        this.selectedSize = val;
        this.onChange(val);
        this.onTouched();
    }
    
    writeValue(obj: any): void {
        if (obj) {
            this.selectedSize = obj;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
