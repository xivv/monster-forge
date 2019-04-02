import { CombatManeuver } from './CombatManeuver';
import { Feat } from './Feat';
import { Ability } from './Ability';
import { Skillcheck } from './Skillcheck';

export interface Statistics {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    bab?: number;
    cmb?: number;
    combatManeuver?: CombatManeuver[];
    cmd?: number;
    feats?: Feat[];
    languages?: String[];
    skills?: Skillcheck[];
    abilities?: Ability[];
    legendaryDescription?: String;
}
