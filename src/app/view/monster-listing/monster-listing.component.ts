import { Component, OnInit, Input } from '@angular/core';
import { MonsterService } from 'src/app/services/monster.service';
import { Monster } from 'src/app/model/Monster';
import { ActivatedRoute } from '@angular/router';
import { Size } from 'src/app/model/Size';
import { Alignment } from 'src/app/model/Alignment';
import { Type } from 'src/app/model/Type';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-monster-listing',
  templateUrl: './monster-listing.component.html',
  styleUrls: ['./monster-listing.component.scss']
})
export class MonsterListingComponent implements OnInit {



  @Input() userid: string;
  monsters: Monster[];

  constructor(
    public monsterService: MonsterService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  types = Type;
  sizes = Size;
  alignments = Alignment;

  isOwner(monster: Monster) {
    return this.authService.getUserId() === monster.userid;
  }

  delete(monster: Monster) {
    this.monsterService.deleteMonster(monster);
  }

  getList() {
    const list = this.route.snapshot.paramMap.get('list');

    if (this.userid != null) {
      return this.monsterService.userProfileMonsters;
    } else if (list === 'my') {
      return this.monsterService.userMonsters;
    } else {
      return this.monsterService.monsters;
    }
  }

  ngOnInit() {
  }

}
