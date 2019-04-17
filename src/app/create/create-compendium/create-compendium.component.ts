import { Component, OnInit } from '@angular/core';
import { MonsterService } from 'src/app/services/monster.service';
import { CompendiumService } from 'src/app/services/compendium.service';
import { Type } from '@angular/compiler';
import { Size } from 'src/app/model/Size';
import { Alignment } from 'src/app/model/Alignment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compendium } from 'src/app/model/Compendium';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';
import { Monster } from 'src/app/model/Monster';

@Component({
  selector: 'app-create-compendium',
  templateUrl: './create-compendium.component.html',
  styleUrls: ['./create-compendium.component.scss']
})
export class CreateCompendiumComponent implements OnInit {

  constructor(
    private monsterService: MonsterService,
    private authService: AuthService,
    public compendiumService: CompendiumService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router
  ) { }

  /* Forms */
  form: FormGroup;

  /* Enums */
  types = Type;
  sizes = Size;
  alignments = Alignment;

  /* Wizard Variables */
  isEditMode = false;
  public maxCompendiums = 3;
  wizardPosition = 0;
  wizardPages = 1;
  wizardHeader = [
    'Basic Information',
    'Managing Monsters'
  ];

  /* Misc */
  originalCompendium: Compendium;

  dropdownList: Monster[] = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };

  ngOnInit() {
    this.spinnerService.show();
    this.monsterService.monsters.subscribe(
      val => {
        this.dropdownList = val;
        console.log(val);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('');
      });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      imageUrl: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2400)]],
      monsters: [[]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.isEditMode = true;
      this.compendiumService.getCompendium(id).subscribe(val_ => {

        if (val_) {

          // We check if the editor is really the owner
          if (this.authService.getUserId() !== val_.userid) {
            this.router.navigate(['']);
          }

          this.originalCompendium = val_;
          this.loadCompendium(val_);
          this.spinnerService.hide();
        }
      });
    }
  }

  loadCompendium(compendium: Compendium) {

    const flatValues = [
      'name',
      'description',
      'imageUrl',
      'monsters'
    ];

    flatValues.forEach(element => {
      this.form.controls[element].setValue(compendium[element]);
    });


    compendium.monsters.forEach(element => {

      this.dropdownList.forEach(monster => {

        if (monster.id === element) {
          this.selectedItems.push({
            id: monster.id,
            name: monster.name
          });
        }
      });
    });
  }


  addMonster(monster: Monster) {
    this.form.controls.monsters.value.push(monster.id);
  }

  removeMonster(monster: Monster) {
    this.form.controls.monsters.value.splice(this.form.controls.monsters.value.indexOf(monster.id), 1);
  }

  next() {
    this.wizardPosition++;
  }


  back() {
    this.wizardPosition--;
  }

  create() {

    if (this.form.invalid) {
      return;
    }

    const compendium: Compendium = {
      imageUrl: this.form.controls.imageUrl.value,
      description: this.form.controls.description.value,
      name: this.form.controls.name.value,
      userid: this.authService.getUserId(),
      monsters: [],
      upvotes: []
    };

    this.selectedItems.forEach(element => {
      compendium.monsters.push(element.id);
    });

    if (this.isEditMode) {
      compendium.id = this.route.snapshot.paramMap.get('id');
      compendium.upvotes = this.originalCompendium.upvotes;
      this.compendiumService.updateCompendium(compendium).then(val => {
        this.router.navigate(['/compendium/' + compendium.id]);
      });
    } else {
      this.compendiumService.insertCompendium(compendium).then(val => {
        this.router.navigate(['/compendium/' + val.id]);
      });
    }
  }
}
