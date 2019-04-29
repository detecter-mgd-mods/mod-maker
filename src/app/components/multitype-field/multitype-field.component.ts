import { Component, OnInit, Input } from '@angular/core';
import { FieldType } from 'src/app/enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { VirtualDatabase } from 'src/app/models/system/virtualDatabase';
import { PropertyType } from 'src/app/enums/propertyType';
import { Option } from '../../models/system/option';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'multitype-field',
    templateUrl: './multitype-field.component.html',
    styleUrls: ['./multitype-field.component.css']
})
export class MultitypeFieldComponent implements OnInit {

    public FieldType = FieldType;
    public PropertyType = PropertyType;

    public display: boolean = false;
    public displayKey: string = '';
    public displayTitle: string = '';
    public displayInput: string = '';
    public displayOptions: SelectItem[] = [];
    public displaySelectedOptions: any[] = [];

    @Input()
    public formModel;
    @Input()
    public formGroup: FormGroup;
    @Input()
    public key: string;

    ngOnInit(): void {
    }

    public displayInputAddons(addons: any[], key: string): void {
        for (let addon of addons) {

            if (addon.innerHTML.includes("wrench")) {
                addon.style.display = this.formModel[key].type === FieldType.Dropdown || this.formModel[key].type === FieldType.Multiselect
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

    public toggleInfo(key: string, op: any, $event: any): void {
        op.toggle($event)
    }

    public showDialog(key: string): void {

        this.display = true;
        this.displayKey = key;
        this.displayInput = '';

        var propertyType = this.formModel[key].propertyType;
        this.displayTitle = PropertyType[propertyType];
        this.displayOptions = this.formModel[key].getAllItems(propertyType, true);
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

        var newOption: Option = new Option(this.formModel[this.displayKey].propertyType, this.displayInput, this.displayInput, true, false);

        this.displayOptions = Object.assign([], this.displayOptions.concat([{ label: this.displayInput, value: newOption, disabled: false } as SelectItem]));
        this.displaySelectedOptions = Object.assign([], this.displaySelectedOptions.concat([newOption]));

    }

    public saveOptions(): void {

        let customOptions = this.displayOptions.filter(o => o.value.isDefault === false);
        if (!customOptions || customOptions.length === 0) return;

        for (let option of customOptions) {
            VirtualDatabase.OptionRepository.EditRow(o => o.id === option.value.id, option.value, true);
        }

        let formKeys = Object.keys(this.formModel);
        //update dropdowns
        for (let key of formKeys) {
            if (this.formModel[key].type === FieldType.Dropdown || this.formModel[key].type === FieldType.Multiselect) {
                this.formModel[key].selectItems = this.formModel[key].getSelectedItems(this.formModel[key].propertyType);
            }
        }

    }


}