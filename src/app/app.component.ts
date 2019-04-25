import { Component, OnInit } from '@angular/core';
import { Skill } from './models/skill';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FieldType } from './enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { PropertyType } from './enums/propertyType';
import { TypeScriptEmitter } from '@angular/compiler';
import { Option } from './models/system/option';
import { VirtualDatabase } from './models/system/virtualDatabase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public FieldType = FieldType;
  public PropertyType = PropertyType;

  public skillForm: FormGroup;
  public readonly skillModel: Skill = new Skill()
  public readonly skillKeys: string[] = Object.keys(this.skillModel);

  public display: boolean = false;
  public displayKey: string = '';
  public displayTitle: string = '';
  public displayInput: string = '';
  public displayOptions: SelectItem[] = [];
  public displaySelectedOptions: any[] = [];

  public ngOnInit(): void {

    var controls = {};
    this.skillKeys.forEach(k => {

      var value = this.skillModel[k].initialValue

      controls[k] = this.skillModel[k].required
        ? new FormControl(value, Validators.required)
        : new FormControl(value)
    });
    this.skillForm = new FormGroup(controls);

  }

  public onSubmit() {

    if (this.skillForm.valid) {

      let result = {};
      for (let key of this.skillKeys) {
        if (typeof this.skillForm.value[key] === 'string')
          result[key] = this.skillForm.value[key];
        else if (Array.isArray(this.skillForm.value[key]))
          result[key] = this.skillForm.value[key].map(o => o.value);
        else if (typeof this.skillForm.value[key] === 'object')
          result[key] = this.skillForm.value[key].value;
      }

      var file = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });

      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = this.skillForm.value['name']
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

    for (let key of Object.keys(this.skillForm.controls)) {

      const controlErrors: ValidationErrors = this.skillForm.get(key).errors;
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
        addon.style.display = this.skillModel[key].type === FieldType.Dropdown || this.skillModel[key].type === FieldType.Multiselect
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
    return this.skillForm.get(key).hasError('required') && this.skillForm.get(key).touched;
  }

  public showDialog(key: string): void {

    this.display = true;
    this.displayKey = key;
    this.displayInput = '';

    var propertyType = this.skillModel[key].propertyType;
    this.displayTitle = PropertyType[propertyType];
    this.displayOptions = this.skillModel[key].getAllItems(propertyType, true);
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

    var newOption: Option = new Option(this.skillModel[this.displayKey].propertyType, this.displayInput, this.displayInput, true, false);

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
    for (let key of this.skillKeys) {
      if (this.skillModel[key].type === FieldType.Dropdown || this.skillModel[key].type === FieldType.Multiselect) {
        this.skillModel[key].selectItems = this.skillModel[key].getSelectedItems(this.skillModel[key].propertyType);
      }
    }

  }



}
