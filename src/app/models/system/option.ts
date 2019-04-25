import { PropertyType } from 'src/app/enums/propertyType';
import { IIdentifiable } from '../../interfaces/iidentifiable';

export class Option implements IIdentifiable {

    id: string;
    propertyType: PropertyType;
    label: string;
    value: string;
    isSelected: boolean;
    isDefault: boolean;

    constructor(propertyType: PropertyType, label: string, value: string, isSelected: boolean, isDefault: boolean) {

        this.id = label;
        this.propertyType = propertyType;
        this.label = label;
        this.value = value === 'Empty' ? '' : value;
        this.isSelected = isSelected;
        this.isDefault = isDefault;

    }

}
