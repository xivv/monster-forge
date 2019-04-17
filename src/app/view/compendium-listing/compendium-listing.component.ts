import { Component, OnInit, Input } from '@angular/core';
import { CompendiumService } from 'src/app/services/compendium.service';
import { ActivatedRoute } from '@angular/router';
import { Compendium } from 'src/app/model/Compendium';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-compendium-listing',
  templateUrl: './compendium-listing.component.html',
  styleUrls: ['./compendium-listing.component.scss']
})
export class CompendiumListingComponent implements OnInit {

  @Input() userid: string;

  constructor(
    public compendiumService: CompendiumService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  delete(compendium: Compendium) {
    this.compendiumService.deleteCompendium(compendium);
  }

  isOwner(compendium: Compendium) {
    return this.authService.getUserId() === compendium.userid;
  }

  getList() {
    const list = this.route.snapshot.paramMap.get('list');

    if (list === 'my') {
      return this.compendiumService.userCompendiums;
    } else {
      return this.compendiumService.compendiums;
    }
  }

}
