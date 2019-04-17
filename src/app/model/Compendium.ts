import { Monster } from './Monster';

export interface Compendium {
    id?: string;
    imageUrl?: string;
    description: string;
    name: string;
    userid: string;
    monsters: String[];
    upvotes: string[];
}
