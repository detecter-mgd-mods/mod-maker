import { FieldType } from '../enums/fieldType';
import { Field } from './system/field';
import { PropertyType } from '../enums/propertyType';

export class Monster {

    "name": Field<string> = new Field("", FieldType.Text, "Name", "Is displayed name", true);
    "IDname": Field<string> = new Field("", FieldType.Text, "ID Name", "Is used to find the monster in events or exploring locations", true);
    "species": Field<string> = new Field("", FieldType.Text, "Species", "Currently does nothing", false);
    "gender": Field<string> = new Field("female", FieldType.Text, "Gender", "Monster gender", true);
    "description": Field<string> = new Field("", FieldType.Text, "Description", "Physical description of the monster", false);
    "encyclopedia": Field<string> = new Field("", FieldType.Text, "Encyclopedia", "Lore information about the monster, only displayed on adventure build screen", false);
    "tags": Field<string> = new Field("none", FieldType.Text, "Tags", "Does nothing currently", false);
    "generic": Field<string> = new Field("True", FieldType.Dropdown, "Generic", "Is it a generic monster or a named enemy", true, PropertyType.Boolean);
    "requires": Field<string> = new Field([""], FieldType.Multiselect, "Requires", "To show up in the adventure screen, you need to have this item in your inventory", false, PropertyType.MonsterRequires);
    "skillList": Field<string> = new Field([""], FieldType.Multiselect, "Skill List", "List of all the skills the monster knows", true, PropertyType.Skill);
    "perks": Field<string> = new Field([""], FieldType.Multiselect, "Perks", "List of monster perks", true, PropertyType.MonsterPerk);
    "stats": Field<string> = new Field([""], FieldType.Multiselect, "Perks", "Monster stats, lvl has effects so be sure to increase it to the level the player is", true, PropertyType.MonsterPerk);
}