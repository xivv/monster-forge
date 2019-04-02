export class MonsterTools {

    static getBonusSign(bonus: number) {
        if (bonus > 0) {
            return '+' + Math.floor(bonus);
        } else {
            return Math.floor(bonus);
        }
    }

    static getBonus(bonus: number) {

        const modifier = (bonus - 10) / 2;
        if (bonus > 10) {
            return '+' + Math.floor(modifier);
        } else {
            return Math.floor(modifier);
        }
    }
}
