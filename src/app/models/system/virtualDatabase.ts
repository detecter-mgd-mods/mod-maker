import { VirtualRepository } from './virtualRepository';
import { Option } from './option';
import { Data } from './data';
import { PropertyType } from 'src/app/enums/propertyType';

export class VirtualDatabase {

    public static readonly OptionRepository: VirtualRepository<Option> = new VirtualRepository<Option>(
        Data.DefaultCostType.map(e => new Option(PropertyType.Cost, e, e, true, true)),
        Data.DefaultFetishTags.map(e => new Option(PropertyType.FetishTag, e, e, true, true)),
        Data.DefaultSkillTags.map(e => new Option(PropertyType.SkillTag, e, e, true, true)),
        Data.DefaultSkillType.map(e => new Option(PropertyType.Skill, e, e, true, true)),
        Data.DefaultStances.map(e => new Option(PropertyType.Stance, e, e, true, true)),
        Data.DefaultStatType.map(e => new Option(PropertyType.Stat, e, e, true, true)),
        Data.DefaultStatusEffects.map(e => new Option(PropertyType.StatusEffect, e, e, true, true)),
    );

}