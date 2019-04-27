import { Skill } from './skill';
import { Monster } from './monster';
import { TreeNode } from 'primeng/components/common/treenode';

export class Mod {
    name: string;
    filesLabels: string[];
    files: TreeNode[];
    skills: Skill[];
    monsters: Monster[];

    constructor(name: string) {
        this.name = name;
        this.skills = [];
        this.monsters = [];
        this.filesLabels = [];
        this.files = [
            {
                "label": "skills",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [

                ]
            }
        ];
    }
}