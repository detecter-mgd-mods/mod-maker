import { Component, OnInit, Input, Output } from '@angular/core';
import { FieldType } from 'src/app/enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { VirtualDatabase } from 'src/app/models/system/virtualDatabase';
import { PropertyType } from 'src/app/enums/propertyType';
import { Option } from '../../models/system/option';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'single-multitype-field',
    templateUrl: './single-multitype-field.component.html',
    styleUrls: ['./single-multitype-field.component.css']
})
export class SingleMultitypeFieldComponent implements OnInit {

    public FieldType = FieldType;
    public PropertyType = PropertyType;

    public display: boolean = false;
    public displayTitle: string = '';
    public displayInput: string = '';
    public displayOptions: SelectItem[] = [];
    public displaySelectedOptions: any[] = [];

    @Input()
    public field;

    public selectedValue: any;
    @Output()
    public selectedValueEvent = new EventEmitter();

    ngOnInit(): void {
    }

    public onValueChange(): void {
        this.selectedValueEvent.emit(this.selectedValue);
    }

    public displayInputAddons(addons: any[]): void {
        for (let addon of addons) {

            if (addon.innerHTML.includes("wrench")) {
                addon.style.display = this.field.type === FieldType.Dropdown || this.field.type === FieldType.Multiselect
                    ? "initial"
                    : "none";
            }

            addon.style.visibility = "visible";
        }

    }

    public hideInputAddons(addons: any[]): void {
        for (let addon of addons) {
            addon.style.visibility = "hidden";
        }
    }

    public toggleInfo(op: any, $event: any): void {
        op.toggle($event)
    }

    public showDialog(): void {

        this.display = true;
        this.displayInput = '';

        var propertyType = this.field.propertyType;
        this.displayTitle = PropertyType[propertyType];
        this.displayOptions = this.field.getAllItems(propertyType, true);
        this.displaySelectedOptions = this.displayOptions.filter(o => o.value.isSelected).map(o => o.value);
    }

    public checkOption($event): void {
        let selectedOptions = $event.value;
        for (let option of this.displayOptions) {
            option.value.isSelected = selectedOptions.find(o => o.id === option.value.id) !== undefined;
        }
    }

    public addOption(): void {

        if (this.displayInput === null || this.displayInput.length === 0) return;
        if (this.displayOptions.find(o => o.label === this.displayInput)) return;

        var newOption: Option = new Option(this.field.propertyType, this.displayInput, this.displayInput, true, false);

        this.displayOptions = Object.assign([], this.displayOptions.concat([{ label: this.displayInput, value: newOption, disabled: false } as SelectItem]));
        this.displaySelectedOptions = Object.assign([], this.displaySelectedOptions.concat([newOption]));

    }

    public saveOptions(): void {

        let customOptions = this.displayOptions.filter(o => o.value.isDefault === false);
        if (!customOptions || customOptions.length === 0) return;

        for (let option of customOptions) {
            VirtualDatabase.OptionRepository.EditRow(o => o && o.id && o.id === option.value.id, option.value, true);
        }

        this.field.selectItems = this.field.getSelectedItems(this.field.propertyType);
    }


}