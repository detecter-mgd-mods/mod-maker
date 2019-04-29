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

    public isRequired(key: string): boolean {
        return this.form.get(key).hasError('required') && this.form.get(key).touched;
    }

    public updateDropdowns() {

        let formKeys = Object.keys(this.formModel);
        for (let key of formKeys) {
            if (this.formModel[key].type === FieldType.Dropdown || this.formModel[key].type === FieldType.Multiselect) {
                this.formModel[key].selectItems = this.formModel[key].getSelectedItems(this.formModel[key].propertyType);
            }
        }
    }

}