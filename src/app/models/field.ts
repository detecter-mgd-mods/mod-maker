import { FieldType } from '../enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MultiSelectItem } from 'primeng/multiselect';

export class Field<T>{

    value: T;
    type: FieldType;
    label: string;
    options?: SelectItem[]

    constructor(value: T, type: FieldType, label: string, options: string[] = []) {
        this.value = value;
        this.type = type;
        this.label = label;
        this.options = [];
        if (options.length > 0) {
            this.options = options.map(o => ({ label: o, value: o }) as SelectItem)
        }
    }
}