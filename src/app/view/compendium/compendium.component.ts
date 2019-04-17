import { Component, OnInit } from '@angular/core';
import { Compendium } from 'src/app/model/Compendium';
import { CompendiumService } from 'src/app/services/compendium.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MonsterService } from 'src/app/services/monster.service';
import { Monster } from 'src/app/model/Monster';

@Component({
  selector: 'app-compendium',
  templateUrl: './compendium.component.html',
  styleUrls: ['./compendium.component.scss']
})
export class CompendiumComponent implements OnInit {

  constructor(
    private compendiumService: CompendiumService,
    private monsterService: MonsterService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  compendium: Compendium;
  monsters: Monster[];

  getAllMonster(ids: String[]) {
    return this.monsterService.getAllMonster(ids);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.spinnerService.show();
    this.compendiumService.getCompendium(id).subscribe(val => {
      if (val) {
        this.compendium = val;
        this.compendium.id = id;
        this.spinnerService.hide();
        this.monsters = this.getAllMonster(val.monsters);
      }
    });
  }

  upvote() {
    this.compendium.upvotes.push(this.authService.getUserId());
    this.compendiumService.updateCompendium(this.compendium);
  }

  downvote() {
    const userid = this.authService.getUserId();
    this.compendium.upvotes.splice(this.compendium.upvotes.indexOf(userid), 1);
    this.compendiumService.updateCompendium(this.compendium);
  }

  alreadyVoted() {
    const userid = this.authService.getUserId();
    return this.compendium.upvotes.find(function (element) {
      return element === userid;
    });
  }

  isOwner(compendium: Compendium) {
    return this.authService.getUserId() === compendium.userid;
  }

}
