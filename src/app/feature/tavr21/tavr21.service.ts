import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TAVR21Model } from './tavr21.model';
import { RegistryList } from '../registry-list/registry-list.model';

const DB_COLLECTION = 'TAVR21';
const DB_REGISTRY = 'Registry';

@Injectable({
  providedIn: 'root'
})
export class TAVR21Service {
  constructor(private db: AngularFirestore) {}
  currentForm: TAVR21Model;

  saveForm(tavr21Model: TAVR21Model) {
    this.db
      .collection(DB_COLLECTION)
      .add(tavr21Model)
      .then((docRef: DocumentReference) => {
        console.log(docRef ? docRef.id : 'void'); // docRef of type void | DocumentReference

        // tslint:disable: no-string-literal
        const registry: RegistryList = {
          hn: tavr21Model.section['HN'],
          name: tavr21Model.section['PatName'],
          baseDb: tavr21Model.description['baseDb'],
          status: 'Completed',
          registryId: docRef.id
        };
        // tslint:enable: no-string-literal

        this.db.collection(DB_REGISTRY).add(registry);
      });
  }

  loadForm(): Observable<TAVR21Model[]> {
    return this.db.collection<TAVR21Model>(DB_COLLECTION).valueChanges();
  }
}
