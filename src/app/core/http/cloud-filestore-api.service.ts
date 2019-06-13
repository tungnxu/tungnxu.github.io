import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, scan, tap } from 'rxjs/operators';
import { QueryConfig } from 'src/app/shared/models/query.model';


@Injectable({ providedIn: 'root' })
export class CloudFilestoreApiService {

  constructor(private db: AngularFirestore) {
   }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }
  
  public get(query: QueryConfig, opts?: any): Observable<any> {

    const first = this.db.collection<any>(query.path, ref => {
     
      let refBuild: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if(query.limit != 0){
        refBuild = refBuild.limit(query.limit);
      }else {
        refBuild = refBuild.limit(9999999);
      }
      if(query.where && query.where.length > 0){
        query.where.forEach(x => {
          refBuild = refBuild.where(x.field, x.operator, x.value);
        })
      }else {
        if( query.orderBy && query.reverse){
          refBuild = refBuild.orderBy(query.orderBy, query.reverse ? 'desc' : 'asc')
        }
      }
      
      

      return refBuild;
    });

    return first.snapshotChanges()
    .pipe(
      catchError(this.formatErrors),
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public create(colectionName: string, payload: any) {
    return new Promise<any>((resolve, reject) =>{
      this.db.collection(colectionName).add(payload).then(res => {
        resolve(res);
      },(rej)=>{
        reject(rej);
      });
     
    });
  }

  public update(colectionName: string, payload: any) {
    return this.db.collection(colectionName).doc(payload.id).set({ completed: true }, { merge: true });
  }

  public delete(colectionName: string, payload: any) {
    return this.db.collection(colectionName).doc(payload.id).delete();
  }
}
