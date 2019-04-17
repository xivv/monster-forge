import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovementType } from 'src/app/model/MovementType';
import { Alignment } from 'src/app/model/Alignment';
import { Sense } from 'src/app/model/Sense';
import { Size } from 'src/app/model/Size';
import { AbilityType } from 'src/app/model/AbilityType';
import { ImmunityType } from 'src/app/model/ImmunityType';
import { Movement } from 'src/app/model/Movement';
import { Type } from 'src/app/model/Type';
import { Skill } from 'src/app/model/Skill';
import { Skillcheck } from 'src/app/model/Skillcheck';
import { MonsterTools } from 'src/app/tools/MonsterTools';
import { DamageType } from 'src/app/model/DamageType';
import { Condition } from 'src/app/model/Condition';
import { Ability } from 'src/app/model/Ability';
import { AuthService } from 'src/app/auth/auth.service';
import { MonsterService } from 'src/app/services/monster.service';
import { Monster } from 'src/app/model/Monster';
import { Immunity } from 'src/app/model/Immunity';
import { Resistance } from 'src/app/model/Resistance';
import { Stat } from 'src/app/model/Stat';
import { SavingThrow } from 'src/app/model/SavingThrow';
import { SenseType } from 'src/app/model/SenseType';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';
import { ResizeService } from 'src/app/services/resize.service';

@Component({
  selector: 'app-monster-creation',
  templateUrl: './monster-creation.component.html',
  styleUrls: ['./monster-creation.component.scss']
})
export class MonsterCreationComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public monsterService: MonsterService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private resizeService: ResizeService
  ) { }

  /* Wizard Variables */
  private maxAbilities = 20;
  public maxMonster = 10;
  private maxLanguages = 10;
  isEditMode = false;
  wizardPosition = 0;
  wizardPages = 4;
  wizardHeader = [
    'Basic Information',
    'Tenacity and Movement',
    'Ability Scores',
    'Defenses and Skills',
    'Abilities'
  ];

  /* Enums */
  conditions = Object.keys(Condition);
  damageTypes = Object.keys(DamageType);
  skills = Object.keys(Skill);
  savingThrows = Object.keys(Stat);
  types = Object.keys(Type);
  abilityTypes = Object.keys(AbilityType);
  immunityTypes = ImmunityType;
  sizes = Object.keys(Size);
  senses = Object.keys(SenseType);
  alignments = Object.keys(Alignment);
  movementTypes = Object.keys(MovementType);

  /* Forms */
  form: FormGroup;
  abilityForm: FormGroup;
  skillForm: FormGroup;
  savingThrowForm: FormGroup;
  languageForm: FormGroup;
  senseForm: FormGroup;
  movementForm: FormGroup;

  /* Misc */
  originalMonster: Monster;
  private resizeSubscription: Subscription;
  isMobile: boolean;

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ngOnInit() {

    this.isMobile = window.screen.width < 1024;

    this.resizeSubscription = this.resizeService.onResize$
      .subscribe(size => {
        this.isMobile = size.window.innerWidth < 1024;
      });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      imageUrl: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2400)]],
      size: [this.sizes[0], [Validators.required]],
      type: [this.types[0], [Validators.required]],
      alignment: [this.alignments[0], [Validators.required]],
      ac: [10, [Validators.required, Validators.min(0), Validators.max(25)]],
      hp: [12, [Validators.required, Validators.min(1), Validators.max(1000)]],
      hitdie: [12, [Validators.required, Validators.min(1), Validators.max(20)]],
      hitdice: [12, [Validators.required, Validators.min(1), Validators.max(40)]],
      bonusHp: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      movements: [[], []],
      skills: [[], []],
      vulnerabilities: [[], []],
      resistances: [[], []],
      damageImmunities: [[], []],
      conditionImmunities: [[], []],
      senses: [[], []],
      languages: [[], []],
      abilities: [[], []],
      cr: [1, [Validators.required, Validators.min(0), Validators.max(40)]],
      xp: [100, [Validators.required, Validators.min(1), Validators.max(10000000)]],
      str: [10, [Validators.required, Validators.min(0), Validators.max(40)]],
      dex: [10, [Validators.required, Validators.min(0), Validators.max(40)]],
      con: [10, [Validators.required, Validators.min(0), Validators.max(40)]],
      int: [10, [Validators.required, Validators.min(0), Validators.max(40)]],
      wis: [10, [Validators.required, Validators.min(0), Validators.max(40)]],
      cha: [10, [Validators.required, Validators.min(0), Validators.max(40)]],
      damageVulnerability: [this.damageTypes[0], []],
      savingThrows: [[], []],
      damageResistance: [this.damageTypes[0], []],
      damageImmunity: [this.damageTypes[0], []],
      conditionImmunity: [this.conditions[0], []],
      legendaryDescription: ['', []]
    });

    this.languageForm = this.formBuilder.group({
      language: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
    });

    this.skillForm = this.formBuilder.group({
      skill: [this.skills[0], [Validators.required]],
      skillBonus: [0, [Validators.required, Validators.min(-40), Validators.max(40)]]
    });

    this.senseForm = this.formBuilder.group({
      type: [this.senses[0], [Validators.required]],
      range: [60, [Validators.required, Validators.min(5), Validators.max(1000)]]
    });

    this.savingThrowForm = this.formBuilder.group({
      savingThrow: [this.savingThrows[0], [Validators.required]],
      savingThrowBonus: [0, [Validators.required, Validators.min(-40), Validators.max(40)]]
    });

    this.abilityForm = this.formBuilder.group({
      ability: [this.abilityTypes[0], [Validators.required]],
      abilityName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      abilityDescription: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(4000)]]
    });

    this.movementForm = this.formBuilder.group({
      movementType: [this.movementTypes[0], [Validators.required]],
      speed: [30, [Validators.required]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.spinnerService.show();
      this.isEditMode = true;
      this.monsterService.getMonster(id).subscribe(val => {
        if (val) {

          // We check if the editor is really the owner

          if (this.authService.getUserId() !== val.userid) {
            this.router.navigate(['']);
          }

          this.originalMonster = val;
          this.loadMonster(val);
        }
      });
    }
  }

  setWizardPosition(position: number) {
    this.wizardPosition = position;
  }

  loadMonster(monster: Monster) {

    const flatValues = [
      'name',
      'description',
      'imageUrl',
      'cr',
      'xp',
      'alignment',
      'size',
      'type',
      'senses'
    ];

    const defenseValues = [
      'ac',
      'hp',
      'bonusHp',
      'hitdie',
      'hitdice',
      'resistances',
      'vulnerabilities',
      'savingThrows'
    ];

    const offenseValues = [
      'movements'
    ];

    const statisticValues = [
      'str',
      'dex',
      'con',
      'int',
      'wis',
      'cha',
      'languages',
      'skills',
      'abilities',
      'legendaryDescription'
    ];

    monster.defenses.immunities.forEach(element => {
      if (element.type === ImmunityType.DAMAGE) {
        this.form.controls.damageImmunities.value.push(element);
      } else {
        this.form.controls.conditionImmunities.value.push(element);
      }
    });

    offenseValues.forEach(element => {
      this.form.controls[element].setValue(monster.offenses[element]);
    });

    flatValues.forEach(element => {
      this.form.controls[element].setValue(monster[element]);
    });

    defenseValues.forEach(element => {
      this.form.controls[element].setValue(monster.defenses[element]);
    });

    statisticValues.forEach(element => {
      this.form.controls[element].setValue(monster.statistics[element]);
    });

    this.spinnerService.hide();
  }

  create() {

    if (this.form.valid) {

      const monster: Monster = {
        userid: this.authService.getUserId(),
        name: this.form.controls.name.value,
        createdOn: new Date(),
        description: this.form.controls.description.value,
        imageUrl: this.form.controls.imageUrl.value,
        cr: this.form.controls.cr.value,
        xp: this.form.controls.xp.value,
        alignment: this.form.controls.alignment.value,
        size: this.form.controls.size.value,
        type: this.form.controls.type.value,
        senses: this.form.controls.senses.value,
        defenses: {
          ac: this.form.controls.ac.value,
          acSources: [],
          hp: this.form.controls.hp.value,
          bonusHp: this.form.controls.bonusHp.value,
          hitdie: this.form.controls.hitdie.value,
          hitdice: this.form.controls.hitdice.value,
          immunities: this.form.controls.damageImmunities.value.concat(this.form.controls.conditionImmunities.value),
          resistances: this.form.controls.resistances.value,
          vulnerabilities: this.form.controls.vulnerabilities.value,
          savingThrows: this.form.controls.savingThrows.value
        },
        offenses: {
          movements: this.form.controls.movements.value
        },
        statistics: {
          str: this.form.controls.str.value,
          dex: this.form.controls.dex.value,
          con: this.form.controls.con.value,
          int: this.form.controls.int.value,
          wis: this.form.controls.wis.value,
          cha: this.form.controls.cha.value,
          languages: this.form.controls.languages.value,
          skills: this.form.controls.skills.value,
          abilities: this.form.controls.abilities.value,
          legendaryDescription: this.form.controls.legendaryDescription.value
        },
        upvotes: []
      };

      if (this.isEditMode) {
        monster.id = this.route.snapshot.paramMap.get('id');
        monster.upvotes = this.originalMonster.upvotes;
        this.monsterService.updateMonster(monster).then(val => {
          this.router.navigate(['/monster/' + monster.id]);
        });
      } else {
        this.monsterService.insertMonster(monster).then(val => {
          this.router.navigate(['/monster/' + val.id]);
        });
      }
    }
  }

  next() {
    this.wizardPosition++;
  }


  back() {
    this.wizardPosition--;
  }

  hasActions() {
    return this.getFilteredAbilities(this.abilityTypes[0]).length > 0;
  }

  hasAbilities() {
    return this.getFilteredAbilities(this.abilityTypes[3]).length > 0;
  }

  hasReactions() {
    return this.getFilteredAbilities(this.abilityTypes[2]).length > 0;
  }

  hasLegendaryActions() {
    return this.getFilteredAbilities(this.abilityTypes[1]).length > 0;
  }

  getFilteredAbilities(abilityType: string) {

    const abilities = [];

    this.form.controls.abilities.value.forEach(element => {
      if (element.type === abilityType) {
        abilities.push(element);
      }
    });

    return abilities;
  }

  getBonusSign(bonus: number) {
    return MonsterTools.getBonusSign(bonus);
  }
  getBonus(bonus: number) {
    return MonsterTools.getBonus(bonus);
  }

  getFilteredMovementList() {
    return this.movementTypes;
  }

  getFilteredDamageVulnerabilitiesList() {
    return this.damageTypes;
  }

  getFilteredDamageResistancesList() {
    return this.damageTypes;
  }

  getFilteredSkillsList() {
    return this.skills;
  }

  getFilteredDamageImmunitiesList() {
    return this.damageTypes;
  }

  getFilteredConditionImmunitiesList() {
    return this.conditions;
  }

  getFilteredSensesList() {
    return this.senses;
  }

  removeMovement(index: number) {
    this.form.controls.movements.value.splice(index, 1);
  }

  removeSkill(index: number) {
    this.form.controls.skills.value.splice(index, 1);
  }

  removeSavingThrow(index: number) {
    this.form.controls.savingThrows.value.splice(index, 1);
  }

  removeDamageVulnerability(index: number) {
    this.form.controls.vulnerabilities.value.splice(index, 1);
  }

  removeDamageResistance(index: number) {
    this.form.controls.resistances.value.splice(index, 1);
  }

  removeDamageImmunity(index: number) {
    this.form.controls.damageImmunities.value.splice(index, 1);
  }
  removeConditionImmunity(index: number) {
    this.form.controls.conditionImmunities.value.splice(index, 1);
  }
  removeSense(index: number) {
    this.form.controls.senses.value.splice(index, 1);
  }
  removeLanguage(index: number) {
    this.form.controls.languages.value.splice(index, 1);
  }
  addDamageResistance() {

    const resistance: Resistance = {
      type: this.form.controls.damageResistance.value,
      amount: 0
    };
    this.addObjectToForm(resistance, this.form.controls.resistances.value, 'type', undefined, 'amount');
  }

  addDamageVulnerability() {
    if (this.form.controls.vulnerabilities.value.indexOf(this.form.controls.damageVulnerability.value) === -1) {
      this.form.controls.vulnerabilities.value.push(this.form.controls.damageVulnerability.value);
    }
  }

  addDamageImmunity() {

    const immunity: Immunity = {
      type: ImmunityType.DAMAGE,
      name: this.form.controls.damageImmunity.value
    };
    this.addObjectToForm(immunity, this.form.controls.damageImmunities.value, 'name');
  }

  addConditionImmunity() {

    const immunity: Immunity = {
      type: ImmunityType.CONDITION,
      name: this.form.controls.conditionImmunity.value
    };
    this.addObjectToForm(immunity, this.form.controls.conditionImmunities.value, 'name');
  }

  addSense() {

    const sense: Sense = {
      type: this.senseForm.controls.type.value,
      range: this.senseForm.controls.range.value
    };
    this.addObjectToForm(sense, this.form.controls.senses.value, 'type', this.senseForm, 'range');
  }

  addLanguage() {
    if (this.form.controls.languages.value.length >= this.maxLanguages || this.languageForm.invalid) {
      return;
    }

    if (this.form.controls.languages.value.indexOf(this.languageForm.controls.language.value) === -1) {
      this.form.controls.languages.value.push(this.languageForm.controls.language.value);
      this.languageForm.controls.language.setValue('');
    }
  }

  addAbility() {

    if (this.abilityForm.invalid || this.form.controls.abilities.value.length >= this.maxAbilities) {
      return;
    } else {
      const ability: Ability = {
        name: this.abilityForm.controls.abilityName.value,
        type: this.abilityForm.controls.ability.value,
        description: this.abilityForm.controls.abilityDescription.value
      };
      this.form.controls.abilities.value.push(ability);
      this.abilityForm.controls.abilityName.setValue('');
      this.abilityForm.controls.abilityDescription.setValue('');
    }
  }

  removeAbility(abilityName: string) {
    this.form.controls.abilities.value.forEach(element => {
      if (element.name === abilityName) {
        this.form.controls.abilities.value.splice(this.form.controls.abilities.value.indexOf(element), 1);
        return;
      }
    });
  }

  addSavingThrow() {

    const savingThrow: SavingThrow = {
      type: this.savingThrowForm.controls.savingThrow.value,
      amount: this.savingThrowForm.controls.savingThrowBonus.value
    };
    this.addObjectToForm(savingThrow, this.form.controls.savingThrows.value, 'type', this.savingThrowForm, 'amount');
  }

  addSkill() {

    const skillcheck: Skillcheck = {
      skill: this.skillForm.controls.skill.value,
      bonus: this.skillForm.controls.skillBonus.value
    };
    this.addObjectToForm(skillcheck, this.form.controls.skills.value, 'skill', this.skillForm, 'bonus');
  }

  addMovement() {
    const movement: Movement = {
      type: this.movementForm.controls.movementType.value,
      amount: this.movementForm.controls.speed.value
    };
    this.addObjectToForm(movement, this.form.controls.movements.value, 'type', this.movementForm, 'amount');
  }

  addObjectToForm(input: any, target: any, attribute: string, form?: FormGroup, overwriteAttribute?: string) {

    if (form && form.invalid) {
      return;
    }

    let isNew = true;

    target.forEach(element => {
      if (element[attribute] === input[attribute]) {
        isNew = false;
        if (overwriteAttribute) {
          element[overwriteAttribute] = input[overwriteAttribute];
        }
        return;
      }
    });

    if (isNew) {
      target.push(input);
    }

  }


}
