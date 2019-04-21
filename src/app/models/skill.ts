import { Field } from './field';
import { FieldType } from '../enums/fieldType';

export class Skill {

    public static readonly DefaultCostType: string[] = ["ep", "sp"]
    public static readonly DefaultStatType: string[] = ["Empty", "Power", "Technique", "Willpower", "Allure", "Luck"]
    public static readonly DefaultStances: string[] = ["Empty", "Any", "Making Out", "Sex", "Anal", "Blowjob", "Titfuck", "Face Sit", "Footjob", "Breast Smother", "Slimed 100%", "Slimed 50%", "Slimed", "Tailjob"];
    public static readonly DefaultStatusEffects: string[] = ["None", "Charm", "Restrain", "Aphrodisiac", "Stun"]
    public static readonly DefaultSkillType: string[] = ["attack", "statusEffect", "Healing", "HealingEP", "HealingSP", "Escape"]
    public static readonly DefaultSkillTags: string[] = ["Empty", "displayPain", "displayMagic", "displaySeduction", "displayMouth", "displayBreasts", "displayAss", "displayPenetration"];
    public static readonly DefaultFetishTags: string[] = ["Empty", "Breasts", "Ass", "HypnosisAddict", "Sex", "Monstrous", "Cock", "Kissing", "Feet", "Penetration"]

    "name": Field<string> = new Field("", FieldType.Text, "Name", "Name of the skill", true);
    "cost": Field<string> = new Field("0", FieldType.Numeral, "Cost", "How much it will take of a resource to use");
    "costType": Field<string> = new Field("ep", FieldType.Dropdown, "Cost Type", "The resource it uses", true, Skill.DefaultCostType);
    "requiredLevel": Field<string> = new Field("0", FieldType.Numeral, "Required Level", "Level required to learn the skill");
    "learningCost": Field<string> = new Field("0", FieldType.Numeral, "Learning Cost", "Eros cost of skill");
    "skillType": Field<string> = new Field("attack", FieldType.Dropdown, "Skill Type", "What kind of skill is it", true, Skill.DefaultSkillType);
    "statType": Field<string> = new Field("Empty", FieldType.Dropdown, "Stat Type", "What stat does it scale off of", true, Skill.DefaultStatType);
    "requiredStat": Field<string> = new Field("0", FieldType.Numeral, "Amount of stat required to learn");
    "skillTags": Field<string[]> = new Field([""], FieldType.Multiselect, "Skill Tags", "What locations it hits, can hit multiple", false, Skill.DefaultSkillTags);
    "fetishTags": Field<string[]> = new Field([""], FieldType.Multiselect, "Fetish Tags", "What fetishes it hits, can be more than one", false, Skill.DefaultFetishTags);
    "startsStance": Field<string> = new Field("", FieldType.Dropdown, "Starts Stance", "What stance it starts if any", false, Skill.DefaultStances);
    "requiresStance": Field<string> = new Field("", FieldType.Text, "Requires Stance", "To use this skill requires this stance, (or “Any”)");
    "unusableIfStance": Field<string[]> = new Field([""], FieldType.Multiselect, "Unusable If Stance", "Cannot use if in one of these stances", false, Skill.DefaultStances);
    "requiresTargetStance": Field<string[]> = new Field("", FieldType.Multiselect, "Requires Target Stance", "Target must be in this stance, or stances", false, Skill.DefaultStances);
    "unusableIfTarget": Field<string[]> = new Field([""], FieldType.Multiselect, "Unusable If Target", "Cannot use on target if they are in one of these stances", false, Skill.DefaultStances);
    "removesStance": Field<string> = new Field("None", FieldType.Text, "Removes Stance", "\"None\",	will remove the listed stance from self and target. All will remove all current stances from EVERYONE. While Target will remove all stances with that target");
    "requiresStatusEffect": Field<string> = new Field("", FieldType.Dropdown, "Requires Status Effect", "\"None\", move requires target to have this status effect", false, Skill.DefaultStatusEffects);
    "requiresStatusPotency": Field<string> = new Field("0", FieldType.Numeral, "Requires Status Potency", "\"0\", move requires the status effect at at least this much potency, not all status effects use potency");
    "unusableIfStatusEffect": Field<string[]> = new Field("", FieldType.Multiselect, "Unusable If Status Effect", "[\"None\"], The move can not be used if the target has one of these status effects", false, Skill.DefaultStatusEffects);
    "power": Field<string> = new Field("10", FieldType.Numeral, "Power", "\"base damage of skill\”, statusEffect is not affected by this");
    "minRange": Field<string> = new Field("70", FieldType.Numeral, "Min Range", "\"70\”, % minimum damage range");
    "maxRange": Field<string> = new Field("125", FieldType.Numeral, "Max Range", "\"125\", % maximum damage range");
    "recoil": Field<string> = new Field("50", FieldType.Numeral, "Recoil", "\"50\", percentage of damage dealt recoiled at skill user");
    "targetType": Field<string> = new Field("single", FieldType.Text, "Target Type", "\"single\", how many does it target (only single exists currently)");
    "statusEffect": Field<string> = new Field("None", FieldType.Dropdown, "Status Effect", "What status effect it uses if any, attacks can have one, (Charm, Restrain, Aphrodisiac, Stun) EventRestrain can be used for combat events you don’t want spammed", false, Skill.DefaultStatusEffects);
    "statusChance": Field<string> = new Field("0.25", FieldType.Numeral, "Status Chance", "\"0.25\", % chance of the effect occurring. Done in 0.0-1.0");
    "statusDuration": Field<string> = new Field("0", FieldType.Numeral, "Status Duration", "\"0\", how many turns the effect lasts, 1 means it ends the turn its given");
    "statusPotency": Field<string> = new Field("0", FieldType.Numeral, "Status Potency", "\"0\", potency of the effect, Aphrodisiac: damage per turn ; Restrains: restraint durability (degraded by player str each struggle) ; Sleep: amount of sleep progress, 1 is one Z 4 would instantly put the target to sleep.");
    "statusResistedBy": Field<string> = new Field("", FieldType.Dropdown, "Status Resisted By", "\"\", Which stat resists the affect", false, Skill.DefaultStatType);
    "statusText": Field<string> = new Field("", FieldType.Text, "Status Text", "\"\", will change status effect name in game to this, once it works");
    "descrip": Field<string> = new Field("", FieldType.Text, "Description", "Description of the skill here");
    "outcome": Field<string> = new Field("", FieldType.Text, "Outcome", "If the attack hits");
    "miss": Field<string> = new Field("", FieldType.Text, "Miss", "If it misses");
    "statusOutcome": Field<string> = new Field("", FieldType.Text, "Status Outcome", "If the status affect hits");
    "statusMiss": Field<string> = new Field("", FieldType.Text, "Status Miss", "If the status effect misses, (only if skillType is statusEffect)");
    "restraintStruggle": Field<string> = new Field("", FieldType.Text, "Restraint Struggle", "Text when target trys to struggle out of restraints");
    "restraintStruggleCharmed": Field<string> = new Field("", FieldType.Text, "Restraint Struggle Charmed", "Text when target trys to struggle out of restraints while charmed");
    "restraintEscaped": Field<string> = new Field("", FieldType.Text, "Restraint Escaped", "Displays when the target breaks the restraints");
    "restraintEscapedFail": Field<string> = new Field("", FieldType.Text, "Restraint Escaped Fail", "Displays when the target fails to break the restraints");

}