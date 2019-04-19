import { Component, OnInit } from '@angular/core';
import { Skill } from './models/skill';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldType } from './enums/fieldType';

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
    this.skillKeys.forEach(k => controls[k] = new FormControl("", Validators.required));
    this.skillForm = new FormGroup(controls);

  }

  public onSubmit() {
    if (this.skillForm.valid) {
      console.log("Form Submitted!");
      console.log(this.skillForm.value);
      this.skillForm.reset();
    }
  }
}
