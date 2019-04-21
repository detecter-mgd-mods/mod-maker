import { Field } from './field';
import { FieldType } from '../enums/fieldType';

export class Skill {

    public static readonly DefaultStances: string[] = ["Empty", "Any", "Making Out", "Sex", "Anal", "Blowjob", "Titfuck", "Face Sit", "Footjob", "Breast Smother", "Slimed 100%", "Slimed 50%", "Slimed", "Tailjob"];
    public static readonly DefaultStatusEffects: string[] = ["None", "Restrain", "Sleep", "Charm"]
    public static readonly DefaultSkillType: string[] = ["attack", "statusEffect", "Healing", "HealingEP", "Escape"]
    public static readonly DefaultSkillTags: string[] = ["Empty", "displayPain", "displayMagic", "displaySeduction", "displayMouth", "displayBreasts", "displayAss", "displayPenetration"];
    public static readonly DefaultFetishTags: string[] = ["Empty", "Breasts", "Ass", "HypnosisAddict", "Sex", "Monstrous", "Cock", "Kissing", "Feet", "Penetration"]

    "name": Field<string> = new Field("", FieldType.Text, "Name", true);
    "cost": Field<string> = new Field("0", FieldType.Numeral, "Cost");
    "costType": Field<string> = new Field("ep", FieldType.Text, "Cost Type");
    "requiredLevel": Field<string> = new Field("0", FieldType.Numeral, "Required Level");
    "learningCost": Field<string> = new Field("0", FieldType.Numeral, "Learning Cost");
    "skillType": Field<string> = new Field("", FieldType.Array, "Skill Type", true, Skill.DefaultSkillType);
    "statType": Field<string> = new Field("", FieldType.Text, "Stat Type");
    "requiredStat": Field<string> = new Field("0", FieldType.Numeral, "Required Stat");
    "skillTags": Field<string[]> = new Field("", FieldType.Array, "Skill Tags", false, Skill.DefaultSkillTags);
    "fetishTags": Field<string[]> = new Field("", FieldType.Array, "Fetish Tags", false, Skill.DefaultFetishTags);
    "startsStance": Field<string> = new Field("", FieldType.Text, "Starts Stance");
    "requiresStance": Field<string> = new Field("", FieldType.Text, "Requires Stance");
    "unusableIfStance": Field<string[]> = new Field("", FieldType.Array, "Unusable If Stance", false, Skill.DefaultStances);
    "requiresTargetStance": Field<string[]> = new Field("", FieldType.Array, "Requires Target Stance", false, Skill.DefaultStances);
    "unusableIfTarget": Field<string[]> = new Field("", FieldType.Array, "Unusable If Target", false, Skill.DefaultStances);
    "removesStance": Field<string> = new Field("None", FieldType.Text, "Removes Stance");
    "requiresStatusEffect": Field<string> = new Field("None", FieldType.Text, "Requires Status Effect");
    "requiresStatusPotency": Field<string> = new Field("0", FieldType.Numeral, "Requires Status Potency");
    "unusableIfStatusEffect": Field<string[]> = new Field("", FieldType.Array, "Unusable If Status Effect", false, Skill.DefaultStatusEffects);
    "power": Field<string> = new Field("10", FieldType.Numeral, "Power");
    "minRange": Field<string> = new Field("100", FieldType.Numeral, "Min Range");
    "maxRange": Field<string> = new Field("100", FieldType.Numeral, "Max Range");
    "recoil": Field<string> = new Field("0", FieldType.Numeral, "Recoil");
    "targetType": Field<string> = new Field("single", FieldType.Text, "Target Type");
    "statusEffect": Field<string> = new Field("None", FieldType.Text, "Status Effect");
    "statusChance": Field<string> = new Field("0", FieldType.Numeral, "Status Chance");
    "statusDuration": Field<string> = new Field("0", FieldType.Numeral, "Status Duration");
    "statusPotency": Field<string> = new Field("0", FieldType.Numeral, "Status Potency");
    "statusResistedBy": Field<string> = new Field("", FieldType.Text, "Status Resisted By");
    "statusText": Field<string> = new Field("", FieldType.Text, "Status Text");
    "descrip": Field<string> = new Field("", FieldType.Text, "Description");
    "outcome": Field<string> = new Field("", FieldType.Text, "Outcome");
    "miss": Field<string> = new Field("", FieldType.Text, "Miss");
    "statusOutcome": Field<string> = new Field("", FieldType.Text, "Status Outcome");
    "statusMiss": Field<string> = new Field("", FieldType.Text, "Status Miss");
    "restraintStruggle": Field<string> = new Field("", FieldType.Text, "Restraint Struggle");
    "restraintStruggleCharmed": Field<string> = new Field("", FieldType.Text, "Restraint Struggle Charmed");
    "restraintEscaped": Field<string> = new Field("", FieldType.Text, "Restraint Escaped");
    "restraintEscapedFail": Field<string> = new Field("", FieldType.Text, "Restraint Escaped Fail");

}