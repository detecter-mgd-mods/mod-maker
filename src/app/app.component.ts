import { Component, OnInit } from '@angular/core';
import { Skill } from './models/skill';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FieldType } from './enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { PropertyType } from './enums/propertyType';
import { TypeScriptEmitter } from '@angular/compiler';
import { Option } from './models/system/option';
import { VirtualDatabase } from './models/system/virtualDatabase';
import { TreeNode } from 'primeng/components/common/treenode';
import { Mod } from './models/mod';
import { Dropdown } from 'primeng/dropdown';
import { Tab } from './models/ui/tab';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public newFileOptions: SelectItem[] = [
    { label: "Skill", value: "Skill" }
  ];

  public mod: Mod = new Mod("New Mod");
  public skillModel = new Skill();

  public display: boolean = false;
  public newFileName: string = '';

  public openTabs: Tab[] = [];

  public ngOnInit(): void {



  }

  public showDialog(): void {

    this.display = true;
    this.newFileName = '';

  }

  public createFile(dropdown: Dropdown): void {
    var option: SelectItem = dropdown.selectedOption;

    var fileName = this.newFileName.includes(".json")
      ? this.newFileName
      : this.newFileName + ".json";

    if (this.mod.filesLabels.includes(fileName)) return;

    switch (option.value) {
      case "Skill":

        var newSkill = new Skill();
        this.mod.skills.push(newSkill);
        this.mod.filesLabels.push(fileName);
        var skillsFolder = this.mod.files.find(f => f.label === 'skills');

        var newFile = {
          label: fileName,
          icon: 'fa fa-file-o',
          data: newSkill,
          type: "Skill"
        } as TreeNode;

        skillsFolder.children.push(newFile);
        this.openTabs = this.openTabs.concat(new Tab(newFile.label, newFile));

        break;
    }
    this.display = false;
  }

  public fileSelected(event): void {

    var file = event.node;
    if (!file.type) return;
    if (this.openTabs.map(t => t.header).includes(file.label)) return;

    this.openTabs = this.openTabs.concat(new Tab(file.label, file));
  }

  public closeTab(event): void {
    this.openTabs.splice(event.index);
  }

}
