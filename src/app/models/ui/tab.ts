import { TreeNode } from 'primeng/components/common/treenode';

export class Tab {
    header: string;
    file: TreeNode;

    constructor(header: string, file: TreeNode) {
        this.header = header;
        this.file = file;
    }
}