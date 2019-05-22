import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { STS29Model } from './sts29.model';
import { RegistryList } from '../registry-list/registry-list.model';

const DB_REGISTRY = 'Registry';
const DB_COLLECTION = 'STS29';

@Injectable({
  providedIn: 'root'
})
export class STS29Service {
  constructor(private db: AngularFirestore) {}
  currentForm: STS29Model;

  saveForm(sts29Model: STS29Model) {
    this.db
      .collection(DB_COLLECTION)
      .add(sts29Model)
      .then((docRef: DocumentReference) => {
        console.log(docRef ? docRef.id : 'void'); // docRef of type void | DocumentReference

        // tslint:disable: no-string-literal
        const registry: RegistryList = {
          hn: sts29Model.sectionA['HN'],
          name: sts29Model.sectionA['PatName'],
          baseDb: sts29Model.description['baseDb'],
          status: 'Completed',
          registryId: docRef.id
        };
        // tslint:enable: no-string-literal

        this.db.collection(DB_REGISTRY).add(registry);
      });
  }

  loadForm(): Observable<STS29Model[]> {
    // const collection$: Observable<STS29Model> = this.db.collection(DB_COLLECTION).valueChanges();
    // collection$.subscribe(data => console.log(data));

    return this.db.collection<STS29Model>(DB_COLLECTION).valueChanges();

    // this.db
    //   .collection(DB_COLLECTION)
    //   .valueChanges()
    //   .subscribe((data: STS29Model[]) => {
    //     console.log(data);
    //     this.currentForm = data[0];
    //   });

    // this.db
    //   .collection(DB_COLLECTION)
    //   .snapshotChanges()
    //   .map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    //   .subscribe(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       console.log(doc);
    //     });
    //   });
  }
}
