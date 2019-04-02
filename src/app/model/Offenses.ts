import { Movement } from './Movement';
import { Ability } from './Ability';

export interface Offenses {
    movements: Movement[];
    space?: number;
    reach?: number;
    specialAttacks?: Ability[];
}
