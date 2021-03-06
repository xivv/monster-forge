import { Injectable } from '@angular/core';
import { Compendium } from '../model/Compendium';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompendiumService {


  private compendiumCollection: AngularFirestoreCollection<Compendium>;
  compendiums: Observable<Compendium[]> = new Observable;

  private userCompendiumCollection: AngularFirestoreCollection<Compendium>;
  userCompendiums: Observable<Compendium[]> = new Observable;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService) {
    this.compendiumCollection = this.db.collection<Compendium>('compendium');
    this.compendiums = this.compendiumCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Compendium;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.authService.user.subscribe(
      val => {
        if (val) {
          this.userCompendiumCollection = this.db.collection<Compendium>('compendium',
            ref => ref.where('userid', '==', val.uid));
          this.userCompendiums = this.userCompendiumCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Compendium;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
        }
      });
  }

  updateCompendium(compendium: Compendium) {
    return this.compendiumCollection.doc(compendium.id).update(compendium);
  }

  insertCompendium(compendium: Compendium) {
    return this.compendiumCollection.add(compendium);
  }

  deleteCompendium(compendium: Compendium) {
    return this.compendiumCollection.doc(compendium.id).delete();
  }

  getCompendium(id: string) {
    return this.db.doc<Compendium>('compendium/' + id).valueChanges();
  }
}
