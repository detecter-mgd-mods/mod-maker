import { Component, OnInit } from '@angular/core';
import { Skill } from './models/skill';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FieldType } from './enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public FieldType = FieldType;
  public skillForm: FormGroup;
  public readonly skillModel: Skill = new Skill()
  public readonly skillKeys: string[] = Object.keys(this.skillModel);

  public ngOnInit(): void {

    var controls = {};
    this.skillKeys.forEach(k => {

      var value = this.skillModel[k].value

      controls[k] = this.skillModel[k].required
        ? new FormControl(value, Validators.required)
        : new FormControl(value)
    });
    this.skillForm = new FormGroup(controls);

  }

  public onSubmit() {
    if (this.skillForm.valid) {
      var file = new Blob([JSON.stringify(this.skillForm.value, null, 2)], { type: "application/json" });

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

      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
    else {
      this.getFormValidationErrors();
    }
  }

  public getFormValidationErrors() {

    Object.keys(this.skillForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.skillForm.get(key).errors;
      if (controlErrors != null) {

        Object.keys(controlErrors).forEach(keyError => {
          alert("The property " + "'" + key + "'" + ' is ' + keyError);
          return;
        });

      }
    });

  }

  public isRequired(key: string): boolean {
    return this.skillForm.get(key).hasError('required') && this.skillForm.get(key).touched;
  }
}
