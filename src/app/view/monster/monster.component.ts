import { Component, OnInit } from '@angular/core';
import { Monster } from 'src/app/model/Monster';
import { Alignment } from 'src/app/model/Alignment';
import { Route, ActivatedRoute } from '@angular/router';
import { MonsterService } from 'src/app/services/monster.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Type } from 'src/app/model/Type';
import { Size } from 'src/app/model/Size';
import { Sense } from 'src/app/model/Sense';
import { AbilityType } from 'src/app/model/AbilityType';
import { ImmunityType } from 'src/app/model/ImmunityType';
import { MonsterTools } from 'src/app/tools/MonsterTools';
import { Skill } from 'src/app/model/Skill';
import { DamageType } from 'src/app/model/DamageType';
import { Condition } from 'src/app/model/Condition';
import { MovementType } from 'src/app/model/MovementType';
import { SenseType } from 'src/app/model/SenseType';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterComponent implements OnInit {

  constructor(
    private monsterService: MonsterService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  types = Type;
  abilityTypes = AbilityType;
  immunityTypes = ImmunityType;
  damageTypes = DamageType;
  sizes = Size;
  senses = SenseType;
  alignments = Alignment;
  skills = Skill;
  conditions = Condition;
  movements = MovementType;

  monster: Monster;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.spinnerService.show();
    this.monsterService.getMonster(id).subscribe(val => {
      if (val) {
        this.monster = val;
        this.monster.id = id;
        this.spinnerService.hide();
      }
    });
  }

  getFilteredImmunities(immunityType: ImmunityType) {
    return this.monster.defenses.immunities.filter(immunity => immunity.type === immunityType);
  }

  getFilteredAbilities(abilityType: AbilityType) {
    return this.monster.statistics.abilities.filter(ability => this.abilityTypes[ability.type] === abilityType);
  }

  getBonus(bonus: number) {
    return MonsterTools.getBonus(bonus);
  }

  createMonster(monster: Monster) {
    this.monsterService.insertMonster(monster);
  }

  hasActions() {
    return this.getFilteredAbilities(AbilityType.ACTION).length > 0;
  }

  hasReactions() {
    return this.getFilteredAbilities(AbilityType.REACTION).length > 0;
  }

  hasLegendaryActions() {
    return this.getFilteredAbilities(AbilityType.LEGENDARY_ACTION).length > 0;
  }

  upvote() {
    this.monster.upvotes.push(this.authService.getUserId());
    this.monsterService.updateMonster(this.monster);
  }

  downvote() {
    const userid = this.authService.getUserId();
    this.monster.upvotes.splice(this.monster.upvotes.indexOf(userid), 1);
    this.monsterService.updateMonster(this.monster);
  }

  alreadyVoted() {
    const userid = this.authService.getUserId();
    return this.monster.upvotes.find(function (element) {
      return element === userid;
    });
  }

  isOwner(monster: Monster) {
    return this.authService.getUserId() === monster.userid;
  }

  delete(monster: Monster) {
    this.monsterService.deleteMonster(monster);
  }


}
