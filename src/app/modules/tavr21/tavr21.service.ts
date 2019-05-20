import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TAVR21Model } from './tavr21.model';

const DB_COLLECTION = 'TAVR21';

@Injectable({
  providedIn: 'root'
})
export class TAVR21Service {
  constructor(private db: AngularFirestore) {}
  currentForm: TAVR21Model;

  saveForm(tavr21Model: TAVR21Model) {
    this.db.collection(DB_COLLECTION).add(tavr21Model);
  }

  loadForm(): Observable<TAVR21Model[]> {
    return this.db.collection<TAVR21Model>(DB_COLLECTION).valueChanges();
  }
}
