import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterService } from 'src/app/services/monster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userid: string;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService
  ) { }

  ngOnInit() {
    this.userid = this.route.snapshot.paramMap.get('userid');
    this.monsterService.getProfileMonster(this.userid);
  }

}
