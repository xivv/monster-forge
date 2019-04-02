import { Resistance } from './Resistance';
import { Immunity } from './Immunity';
import { SavingThrow } from './SavingThrow';

export interface Defenses {
    ac: number;
    touch?: number;
    flatFooted?: number;
    acSources: string[];
    hp: number;
    bonusHp?: number;
    hitdie: number;
    hitdice: number;
    defensiveAbilities?: string[];
    fortitude?: number;
    reflex?: number;
    will?: number;
    dr?: number;
    drPenetration?: string[];
    immunities?: Immunity[];
    resistances?: Resistance[];
    spellResistance?: number;
    vulnerabilities?: string[];
    savingThrows?: SavingThrow[];
}
