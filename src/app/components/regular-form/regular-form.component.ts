import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FieldType } from 'src/app/enums/fieldType';
import { PropertyType } from 'src/app/enums/propertyType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { VirtualDatabase } from 'src/app/models/system/virtualDatabase';
import { Option } from '../../models/system/option';
import { IForm } from 'src/app/interfaces/iform';

@Component({
    selector: 'regular-form',
    templateUrl: './regular-form.component.html',
    styleUrls: ['./regular-form.component.css']
})
export class RegularFormComponent implements OnInit {

    public FieldType = FieldType;
    public PropertyType = PropertyType;

    public form: FormGroup;
    @Input()
    public formModel: any;
    public formKeys: string[];

    public display: boolean = false;
    public displayKey: string = '';
    public displayTitle: string = '';
    public displayInput: string = '';
    public displayOptions: SelectItem[] = [];
    public displaySelectedOptions: any[] = [];

    public ngOnInit(): void {

        var controls = {};
        this.formKeys = Object.keys(this.formModel);

        if (!this.formModel.form) {

            this.formKeys.forEach(k => {

                var value = this.formModel[k].initialValue

                controls[k] = this.formModel[k].required
                    ? new FormControl(value, Validators.required)
                    : new FormControl(value)

            });

            this.form = new FormGroup(controls);
            this.formModel.form = this.form;
        }
        else {
            this.form = this.formModel.form;
        }

    }

    public onSubmit() {

        if (this.form.valid) {

            let result = {};
            for (let key of this.formKeys) {
                if (typeof this.form.value[key] === 'string')
                    result[key] = this.form.value[key];
                else if (Array.isArray(this.form.value[key]))
                    result[key] = this.form.value[key].map(o => o.value);
                else if (typeof this.form.value[key] === 'object')
                    result[key] = this.form.value[key].value;
            }

            var file = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });

            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = this.form.value['name']
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
                .replace(/ /g, '');
            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
        else {
            this.getFormValidationErrors();
        }
    }

    public getFormValidationErrors(): void {

        for (let key of Object.keys(this.form.controls)) {

            const controlErrors: ValidationErrors = this.form.get(key).errors;
            if (controlErrors != null) {

                for (let keyError of Object.keys(controlErrors)) {
                    alert("The property " + "'" + key + "'" + ' is ' + keyError);
                    return;
                }

            }
        }

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

    public isRequired(key: string): boolean {
        return this.form.get(key).hasError('required') && this.form.get(key).touched;
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

        //update dropdowns
        for (let key of this.formKeys) {
            if (this.formModel[key].type === FieldType.Dropdown || this.formModel[key].type === FieldType.Multiselect) {
                this.formModel[key].selectItems = this.formModel[key].getSelectedItems(this.formModel[key].propertyType);
            }
        }

    }

}