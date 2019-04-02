import { Monster } from './Monster';

export interface Compendium {
    id?: string;
    description: string;
    name: string;
    userid: string;
    monsters: Monster[];
}
