import { Component, OnInit } from '@angular/core';
import { Skill } from './models/skill';
import { SelectItem } from 'primeng/components/common/selectitem';
import { TreeNode } from 'primeng/components/common/treenode';
import { Mod } from './models/mod';
import { Dropdown } from 'primeng/dropdown';
import { Tab } from './models/ui/tab';
import * as JSZip from 'jszip';

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

  public addDisplay: boolean = false;
  public newFileName: string = '';

  public deleteDisplay: boolean = false;
  public fileOptions: SelectItem[] = [];
  public selectedFileOptions: any[] = [];

  public openTabs: Tab[] = [];

  public ngOnInit(): void {
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

        skillsFolder.children.push(newFile);
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
    if (this.openTabs.map(t => t.header).includes(file.label)) return;

    this.openTabs = this.openTabs.concat(new Tab(file.type + ": " + file.label, file));
  }

  public closeTab(event): void {
    this.openTabs.splice(event.index);
  }

}
