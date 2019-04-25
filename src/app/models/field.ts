import { FieldType } from '../enums/fieldType';
import { SelectItem } from 'primeng/components/common/selectitem';
import { PropertyType } from '../enums/propertyType';
import { Option } from './system/option';
import { VirtualDatabase } from './system/virtualDatabase';

export class Field<T>{

    initialValue: any;
    type: FieldType;
    label: string;
    help: string;
    required?: boolean;
    selectItems?: SelectItem[];
    propertyType?: PropertyType;


    constructor(initialValue: any, type: FieldType, label: string, help: string = "No information",
        required: boolean = false, propertyType: PropertyType = PropertyType.None) {

        this.initialValue = initialValue

        this.type = type;
        this.label = label;
        this.help = help;
        this.required = required;
        this.propertyType = propertyType;
        if (type === FieldType.Dropdown || type === FieldType.Multiselect) {
            this.selectItems = this.getSelectedItems(this.propertyType);
            if (type === FieldType.Dropdown)
                this.initialValue = this.selectItems[0].value;
            else
                this.initialValue = [this.selectItems[0].value];
        }
    }

    public getAllItems(propertyType, isDisabled: boolean = false): SelectItem[] {
        return VirtualDatabase.OptionRepository
            .GetRows(o => o.propertyType === propertyType)
            .map(o => ({ label: o.label, value: o, disabled: isDisabled && o.isDefault }) as SelectItem);
    }

    public getSelectedItems(propertyType, isDisabled: boolean = false): SelectItem[] {
        return VirtualDatabase.OptionRepository
            .GetRows(o => o.isSelected && o.propertyType === propertyType)
            .map(o => ({ label: o.label, value: o, disabled: isDisabled && o.isDefault }) as SelectItem);
    }
}