import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MonsterService } from 'src/app/services/monster.service';
import { CompendiumService } from 'src/app/services/compendium.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public monsterService: MonsterService,
    public compendiumService: CompendiumService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }
}
