import { FieldType } from '../enums/fieldType';
import { Field } from './system/field';
import { PropertyType } from '../enums/propertyType';
import { IForm } from '../interfaces/iform';
import { FormGroup } from '@angular/forms';
import { Stats } from '../models/stats';

export class Monster implements IForm {
    form: FormGroup;

    "name": Field = new Field("", FieldType.Text, "Name", "Is displayed name", true);
    "IDname": Field = new Field("", FieldType.Text, "ID Name", "Is used to find the monster in events or exploring locations", true);
    "species": Field = new Field("", FieldType.Text, "Species", "Currently does nothing", false);
    "gender": Field = new Field("female", FieldType.Text, "Gender", "Monster gender", true);
    "description": Field = new Field("", FieldType.Text, "Description", "Physical description of the monster", false);
    "encyclopedia": Field = new Field("", FieldType.Text, "Encyclopedia", "Lore information about the monster, only displayed on adventure build screen", false);
    "tags": Field = new Field("none", FieldType.Text, "Tags", "Does nothing currently", false);
    "generic": Field = new Field("True", FieldType.Dropdown, "Generic", "Is it a generic monster or a named enemy", true, PropertyType.Boolean);
    "requires": Field = new Field([""], FieldType.Multiselect, "Requires", "To show up in the adventure screen, you need to have this item in your inventory", false, PropertyType.MonsterRequires);
    "skillList": Field = new Field([""], FieldType.Multiselect, "Skill List", "List of all the skills the monster knows", true, PropertyType.Skill);
    "perks": Field = new Field([""], FieldType.Multiselect, "Perks", "List of monster perks", true, PropertyType.MonsterPerk);
    "stats": Field = new Field(new Stats("0"), FieldType.Multiselect, "Perks", "Monster stats, lvl has effects so be sure to increase it to the level the player is", true, PropertyType.MonsterPerk);
}