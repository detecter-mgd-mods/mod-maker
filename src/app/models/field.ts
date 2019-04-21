import { FieldType } from '../enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MultiSelectItem } from 'primeng/multiselect';

export class Field<T>{

    value: any;
    type: FieldType;
    label: string;
    required?: boolean;
    options?: SelectItem[]


    constructor(value: any, type: FieldType, label: string, required: boolean = false, options: string[] = []) {
        this.value = value;
        this.type = type;
        this.label = label;
        this.required = required;
        this.options = [];
        if (options.length > 0) {
            this.options = options.map(o => ({ label: o, value: o === "Empty" ? "" : o }) as SelectItem)
        }
    }
}