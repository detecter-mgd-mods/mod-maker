import { Component, OnInit } from '@angular/core';
import { Skill } from './models/skill';
import { SelectItem } from 'primeng/components/common/selectitem';
import { TreeNode } from 'primeng/components/common/treenode';
import { Mod } from './models/mod';
import { Dropdown } from 'primeng/dropdown';
import { Tab } from './models/ui/tab';
import * as JSZip from 'jszip';
import * as fileSaver from 'file-saver';
import { Field } from './models/system/field';
import { FieldType } from './enums/fieldType';
import { PropertyType } from './enums/propertyType';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public mod: Mod = new Mod("New Mod");
  public skillModel = new Skill();

  public addDisplay: boolean = false;
  public newFileName: string = '';
  public newFileOptions: SelectItem[] = [
    { label: "Skill", value: "Skill" }
  ];
  public skillSubOptionsField: Field<string> = new Field<string>('Empty', FieldType.Dropdown, 'Subdirectory', null, false, PropertyType.SkillSubOption);


  public deleteDisplay: boolean = false;
  public fileOptions: SelectItem[] = [];
  public selectedFileOption: string = '';
  public selectedFileOptions: any[] = [];
  public selectedSubtype: any = {};
  public isEnemySkill: boolean = true;

  public openTabs: Tab[] = [];
  public isZippingSuccesful: boolean = true;

  public ngOnInit(): void {
  }

  public getSelectedSubType(event) {
    this.selectedSubtype = event;
  }

  public showAddDialog(): void {

    this.addDisplay = true;
    this.newFileName = '';

  }

  public createFile(dropdown: Dropdown): void {

    var option: SelectItem = dropdown.selectedOption;

    var fileName = this.newFileName.includes(".json")
      ? this.newFileName
      : this.newFileName + ".json";
    fileName = fileName.split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
      .replace(/ /g, '')


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

        if (this.selectedSubtype && this.selectedSubtype.id && this.selectedSubtype.id.length > 0 && this.selectedSubtype.id !== 'Empty') {

          var folder = skillsFolder.children.find(f => f.label === this.selectedSubtype.id);
          if (folder === undefined) {
            skillsFolder.children.push({
              "label": this.selectedSubtype.id,
              "expandedIcon": "fa fa-folder-open",
              "collapsedIcon": "fa fa-folder",
              "children": [

              ]
            } as TreeNode);
            folder = skillsFolder.children[0];
          }

          if (this.isEnemySkill && this.isEnemySkillDisabled() === false) {

            var enemySkillFolder = folder.children.find(f => f.label === 'EnemySkills');
            if (enemySkillFolder === undefined) {
              folder.children.push({
                "label": 'EnemySkills',
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [
                  newFile
                ]
              });
            }
            else {
              enemySkillFolder.children.push(newFile);
            }
          }
          else {
            folder.children.push(newFile);
          }

        }
        else {
          skillsFolder.children.push(newFile);
        }

        this.openTabs = this.openTabs.concat(new Tab(newFile.type + ": " + newFile.label, newFile));
        break;
    }
    this.addDisplay = false;
  }

  public showDeleteDialog(): void {

    this.deleteDisplay = true;
    this.fileOptions = [];

    for (let file of this.mod.files) {

      this.fileOptions = this.fileOptions.concat(this.getFilesInChildren(file));

    }

  }

  public deleteFiles(event): void {

    let files = event.value;
    if (files && files.length > 0) {

      var labels = files.map(f => f.label);
      this.mod.files = this.deleteFilesInChildren(this.mod.files, labels);
      this.mod.filesLabels = this.mod.filesLabels.filter(fl => labels.includes(fl) === false);
      this.openTabs = this.openTabs.filter(ot => labels.includes(ot.file.label) === false);
    }

    this.deleteDisplay = false;
  }

  public deleteFilesInChildren(files, toDelete: string[]) {

    let result = [];
    for (let file of files) {

      if (file.children && file.children.length > 0) {
        file.children = this.deleteFilesInChildren(file.children, toDelete);
        result.push(file)
      }
      else if (toDelete.includes(file.label) === false) {
        result.push(file)
      }

    }

    return result;

  }

  public getFilesInChildren(file): any[] {

    let result = [];
    let children = file.children;

    if (!children || children.length === 0) return result;
    for (let child of children) {

      if (child.label.includes(".json")) {

        result.push({ label: child.label, value: child });
      }

      let store = this.getFilesInChildren(child);
      if (store && store.length > 0) {
        result = result.concat(store);
      }
    }

    return result;
  }

  public fileSelected(event): void {

    var file = event.node;
    if (!file.type) return;
    if (this.openTabs.map(t => t.file.label).includes(file.label)) return;

    this.openTabs = this.openTabs.concat(new Tab(file.type + ": " + file.label, file));
  }

  public closeTab(event): void {
    this.openTabs.splice(event.index, 1);
  }

  public getField() {
    return this.selectedFileOption === 'Skill' ? this.skillSubOptionsField : this.skillSubOptionsField;
  }

  public exportFiles() {

    var zip = new JSZip();
    let folder: string = '';
    this.zipFiles(zip, folder, this.mod.files);

    if (this.isZippingSuccesful) {

      zip.generateAsync({ type: "blob" }).then(content => {
        fileSaver.saveAs(content, Date.now().toString());
      });

    }

    this.isZippingSuccesful = true;

  }

  public zipFiles(zip: JSZip, folder, files) {

    for (let file of files) {

      if (file.label.includes(".json") === false) {

        folder = folder === '' ? zip.folder(file.label) : folder.folder(file.label);

        if (file.children && file.children.length > 0) {
          this.zipFiles(zip, folder, file.children);
        }

      }
      else {
        if (file.data.form.valid) {
          folder.file(file.label, JSON.stringify(this.convertToModJSON(file.data.form.value), null, 2))
        }
        else {
          if (this.isZippingSuccesful) {
            this.getFormValidationErrors(file.data.form, file.label);
            this.isZippingSuccesful = false;
          }
        }
      }

    }

  }

  public getFormValidationErrors(form, fileName): void {

    for (let key of Object.keys(form.controls)) {

      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {

        for (let keyError of Object.keys(controlErrors)) {
          alert("The property " + "'" + key + "'" + ' is ' + keyError + " in file " + "'" + fileName + "'");
          return;
        }

      }
    }

  }

  public convertToModJSON(data) {

    let result = {};
    let dataKeys = Object.keys(data);

    for (let key of dataKeys) {
      if (typeof data[key] === 'string')
        result[key] = data[key];
      else if (Array.isArray(data[key]))
        result[key] = data[key].map(o => o.value);
      else if (typeof data[key] === 'object')
        result[key] = data[key].value;
    }

    return result;
  }

  public isEnemySkillDisabled(): boolean {

    return !this.selectedSubtype || !this.selectedSubtype.id || this.selectedSubtype.id.length === 0 || this.selectedSubtype.id === 'Empty';

  }

}
