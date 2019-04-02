import { Injectable, OnInit } from '@angular/core';
import { Monster } from '../model/Monster';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonsterService implements OnInit {

  private monsterCollection: AngularFirestoreCollection<Monster>;
  monsters: Observable<Monster[]> = new Observable;

  private userMonsterCollection: AngularFirestoreCollection<Monster>;
  userMonsters: Observable<Monster[]> = new Observable;

  private userProfileMonsterCollection: AngularFirestoreCollection<Monster>;
  userProfileMonsters: Observable<Monster[]> = new Observable;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService) {
    this.monsterCollection = this.db.collection<Monster>('monster');
    this.monsters = this.monsterCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Monster;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.authService.user.subscribe(
      val => {
        if (val) {
          this.getUserMonster(val.uid);
        }
      });
  }

  getUserMonster(userid: string) {
    this.userMonsterCollection = this.db.collection<Monster>('monster',
      ref => ref.where('userid', '==', userid));
    this.userMonsters = this.userMonsterCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Monster;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getProfileMonster(userid: string) {
    this.userProfileMonsterCollection = this.db.collection<Monster>('monster',
      ref => ref.where('userid', '==', userid));
    this.userProfileMonsters = this.userProfileMonsterCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Monster;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  updateMonster(monster: Monster) {
    return this.monsterCollection.doc(monster.id).update(monster);
  }

  insertMonster(monster: Monster) {
    return this.monsterCollection.add(monster);
  }

  getMonster(id: string) {
    return this.db.doc<Monster>('monster/' + id).valueChanges();
  }

  deleteMonster(monster: Monster) {
    this.monsterCollection.doc(monster.id).delete();
  }

  ngOnInit() {

  }
}
