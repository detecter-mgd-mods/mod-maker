import { FieldType } from '../enums/fieldType';

export class Field<T>{
    value: T;
    type: FieldType;
    label: string;

    constructor(value: T, type: FieldType, label: string){
        this.value = value;
        this.type = type;
        this.label = label;
    }
}