import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public database: AngularFirestore) {}

  createDoc(data: any, path: string, id: string) {
    const collenction = this.database.collection(path);
    return collenction.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    const collenction = this.database.collection<tipo>(path);
    return collenction.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collenction = this.database.collection(path);
    return collenction.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collenction = this.database.collection(path);
    return collenction.doc(id).update(data);
  }

  getID(){
    return this.database.createId();
  }

  getCollection<types>(path: string){
    const collenction = this.database.collection<types>(path);
    return collenction.valueChanges();
  }


}
