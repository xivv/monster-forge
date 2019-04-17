import { Alignment } from './Alignment';
import { Size } from './Size';
import { Type } from './Type';
import { SubType } from './SubType';
import { Sense } from './Sense';
import { Defenses } from './Defenses';
import { Offenses } from './Offenses';
import { Ability } from './Ability';
import { Statistics } from './Statistics';

export interface Monster {
    id?: string;
    userid: string;
    createdOn: Date;
    name: string;
    imageUrl?: string;
    description: string;
    cr: number;
    xp: number;
    alignment: Alignment;
    size: Size;
    type: Type;
    subtypes?: SubType[];
    init?: number;
    senses: Sense[];
    aura?: Ability[];
    defenses?: Defenses;
    offenses?: Offenses;
    statistics: Statistics;
    upvotes: string[];
}
